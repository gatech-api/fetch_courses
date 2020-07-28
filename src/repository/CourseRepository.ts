/* Copyright © 2020 Gatech-API - All Rights Reserved. Subject to terms of the PolyForm Noncommercial License. */
import fetch from 'isomorphic-fetch';
import { Backendless, EnableBackendless, BACKENDLESS_APPLICATION_ID, BACKENDLESS_API_KEY } from "../decorator/EnableBackendless.js";
import CourseTransformationUtility from "../util/CourseTransformationUtility.js";
import Course from "../dao/Course.js";
import Class from "../dao/Class.js";
import UnitOfWork = Backendless.UnitOfWork;
import OpResult = Backendless.OpResult;
import UnitOfWorkResult = Backendless.UnitOfWorkResult;


@EnableBackendless
class CourseRepository {

    private courseTransformationUtility: CourseTransformationUtility;

    constructor(courseTransformationUtility: CourseTransformationUtility) {
        this.courseTransformationUtility = courseTransformationUtility;
    }

    /**
     * Invokes Backendless REST API to truncate tables for refresh
     *
     * @since   1.0.0
     * @param   table
     * @access  protected
     */
    protected async _deleteTable(table: string): Promise<string> {
        let response: Response = await fetch(`https://api.backendless.com/${BACKENDLESS_APPLICATION_ID}/${BACKENDLESS_API_KEY}/data/bulk/${table}?where=1%3D1`,
            {method: "DELETE"});
        return response.text();
    }

    /**
     * Sends flattened data to Backendless for relational storage and creates necessary relations
     *
     * @since   1.0.0
     * @param   courses
     */
    public async upsertToDb(courses: Record<string, Record<string, any>>): Promise<string> {
        this.courseTransformationUtility.transformToFlatStructure(courses);
        const flatCourses: Array<Course> = this.courseTransformationUtility.getFlatCourses();
        const flatClasses: Array<Class> = this.courseTransformationUtility.getFlatClasses();

        console.info(`Courses exploded into ${flatCourses.length} rows.`)
        console.info(`Classes exploded into ${flatClasses.length} rows.`)

        await this._deleteTable("Course");
        await this._deleteTable("Class");

        let classTransaction: UnitOfWork = new Backendless.UnitOfWork();
        let courseTransaction: UnitOfWork = new Backendless.UnitOfWork();

        for(let i = 0; i < flatClasses.length; i+=100) {
            if(i != 0 && i % 2000 == 0) {
                await classTransaction.execute().then((result: UnitOfWorkResult) => {
                    classTransaction = new Backendless.UnitOfWork();
                    process.stdout.write(".");
                    if(!result.isSuccess()) {
                        console.info(result);
                    }
                });
            }
            classTransaction.bulkCreate(flatClasses.slice(i, i + 100));
        }

        await classTransaction.execute().then(() => process.stdout.write("\n")).catch(e => console.error(e));

        for(let i = 0; i < flatCourses.length; i++) {
            if(i != 0 && i % 10 == 0) {
                await courseTransaction.execute().then((result: UnitOfWorkResult) => {
                    courseTransaction = new Backendless.UnitOfWork();
                    process.stdout.write(".");
                    if(!result.isSuccess()) {
                        console.info(result);
                    }
                }).catch(e => console.error(e));
            }
            const response: OpResult = courseTransaction.create(flatCourses[i]);
            courseTransaction.setRelation(response, "class", `registrationNumber = ${flatCourses[i].getRegistrationNumber()}`)
        }

        await courseTransaction.execute().then(() => process.stdout.write("\n")).catch(e => console.error(e));

        return "";
    }
}

export default CourseRepository;
