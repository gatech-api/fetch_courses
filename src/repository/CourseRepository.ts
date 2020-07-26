import fetch from 'isomorphic-fetch';
import { Backendless, EnableBackendless, BACKENDLESS_APPLICATION_ID, BACKENDLESS_API_KEY } from "../decorator/EnableBackendless.js";
import CourseTransformationUtility from "../util/CourseTransformationUtility.js";
import Course from "../dao/Course.js";
import Class from "../dao/Class.js";


@EnableBackendless
class CourseRepository {

    private courseTransformationUtility: CourseTransformationUtility;

    constructor(courseTransformationUtility: CourseTransformationUtility) {
        this.courseTransformationUtility = courseTransformationUtility;
    }

    private async _deleteTable(table: string): Promise<string> {
        let response: Response = await fetch(`https://api.backendless.com/${BACKENDLESS_APPLICATION_ID}/${BACKENDLESS_API_KEY}/data/bulk/${table}?where=1%3D1`,
            {method: "DELETE"});
        return response.text();
    }

    async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async upsertToDb(courses: Record<string, Record<string, any>>): Promise<string> {
        this.courseTransformationUtility.transformToFlatStructure(courses);
        const flatCourses: Array<Course> = this.courseTransformationUtility.getFlatCourses();
        const flatClasses: Array<Class> = this.courseTransformationUtility.getFlatClasses();

        console.info(`Courses exploded into ${flatCourses.length} rows.`)
        console.info(`Classes exploded into ${flatClasses.length} rows.`)

        await this._deleteTable("Course");
        await this._deleteTable("Class");

        for(let i = 0; i < flatCourses.length; i+=100) {
            Backendless.Data.of(Course).bulkCreate(flatCourses.slice(i, i + 100))
                .then(() => {
                    process.stdout.write(".");
                })
                .catch((e: Error) => console.info(e));
        }


        for(let i = 0; i < flatClasses.length; i+=100) {
            Backendless.Data.of(Class).bulkCreate(flatClasses.slice(i, i + 100))
                .then(() => {
                    process.stdout.write(".");
                })
                .catch((e: Error) => console.info(e));
        }

        return "";
    }
}

export default CourseRepository;
