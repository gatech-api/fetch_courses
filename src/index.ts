import TermService from './service/TermService.js'
import CourseService from "./service/CourseService.js";
import CourseAcquisitionUtility from "./util/CourseAcquisitionUtility.js";
import CourseTransformationUtility from "./util/CourseTransformationUtility.js";
import CourseRepository from "./repository/CourseRepository.js";


class Index {

    private termService: TermService;

    private courseService: CourseService;

    private courseRepository: CourseRepository;

    constructor(termService: TermService,
                courseService: CourseService,
                courseRepository: CourseRepository) {
        this.termService = termService;
        this.courseService = courseService;
        this.courseRepository = courseRepository;
    }

    init() {
        this.termService.getCurrentTerm()
            .then((term: string) => {

                console.info(`Using term ${term}...`)

                this.courseService.getCourses(term)
                    .then((courses: Record<string, Record<string, any>>) => {

                        console.info(`Publishing ${Object.keys(courses).length} courses...`);

                        this.courseRepository.upsertToDb(courses);
                    }).catch(e => console.error(e));
            }).catch(e => console.error(e));
    }
}

new Index(
    new TermService(),
    new CourseService(new CourseAcquisitionUtility()),
    new CourseRepository(new CourseTransformationUtility())).init();
