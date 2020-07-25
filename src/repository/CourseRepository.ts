import { Backendless, EnableBackendless } from "../decorator/EnableBackendless.js";
import CourseTransformationUtility from "../util/CourseTransformationUtility.js";
import Courses from "../dao/Courses.js";


@EnableBackendless
class CourseRepository {

    private courseTransformationUtility: CourseTransformationUtility;

    constructor(courseTransformationUtility: CourseTransformationUtility) {
        this.courseTransformationUtility = courseTransformationUtility;
    }

    public upsertToDb(courses: Record<string, Record<string, any>>): void {
        const flatCourses: Array<Courses> = this.courseTransformationUtility.transformToFlatStructure(courses);
        console.info(`Courses exploded into ${flatCourses.length} rows.`)

        console.info(flatCourses.flatMap(c => c.getRegistrationNumber()));
        //Make test request
        Backendless.Data.of("GATECH_COURSES").bulkCreate(flatCourses.slice(0, 100))
            .then(() => {
                process.stdout.write("Test request succeeded, continuing");
                for(let i = 100; i < flatCourses.length; i+=100) {
                    Backendless.Data.of(Courses).bulkCreate(flatCourses.slice(i, i + 100))
                        .then(() => {
                            process.stdout.write(".");
                        })
                        .catch((e: Error) => console.info(e));
                }
            })
            .catch((e: Error) => {
                console.error(e);
            });

        console.info("Done.")
    }
}

export default CourseRepository;