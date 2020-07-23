import TermService from './src/TermService.js'
import CourseService from "./src/CourseService.js";


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
            .then(term => {
                console.info(`Using term ${term}`)
                this.courseService.setTerm(term);
                this.courseService.getCourses();
            })
            .catch(e => console.error(e));
    }
}

new Index(
    new TermService(),
    new CourseService()).init();
