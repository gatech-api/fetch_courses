import TermService from './src/TermService.js'


class Index {

    private termService: TermService;

    constructor(termService: TermService) {
        this.termService = termService;
    }

    init() {
        this.termService.getCurrentTerm()
            .then(term => console.log(term))
            .catch(e => console.error(e));
    }
}

new Index(new TermService()).init();
