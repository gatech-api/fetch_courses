require('dotenv').config();
import TermService from './src/TermService.js'
import CourseService from "./src/CourseService.js";
import CourseAcquisitionUtility from "./src/CourseAcquisitionUtility.js";


class Index {

    private termService: TermService;

    private courseService: CourseService;

    constructor(termService: TermService,
                courseService: CourseService) {
        this.termService = termService;
        this.courseService = courseService;
    }

    init() {
        this.termService.getCurrentTerm()
            .then((term: string) => {

                console.info(`Using term ${term}...`)

                this.courseService.getCourses(term)
                    .then((courses: Record<string, Record<string, Object>>) => {

                        console.info(`Publishing ${Object.keys(courses).length} courses...`);

                        let json = JSON.stringify(courses);
                        console.log(json);
                    }).catch(e => console.error(e));
            }).catch(e => console.error(e));
    }
}

new Index(
    new TermService(),
    new CourseService(new CourseAcquisitionUtility())).init();
