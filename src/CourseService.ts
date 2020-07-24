import fetch from 'isomorphic-fetch';
import { COURSE_URI } from "../config.js";
import CourseAcquisitionUtility from "./CourseAcquisitionUtility.js";

class CourseService {

    private courseAcquisitionUtility: CourseAcquisitionUtility;

    constructor(courseAcquisitionUtility: CourseAcquisitionUtility) {
        this.courseAcquisitionUtility = courseAcquisitionUtility;
    }

    /*
     * Returns Promise of courses raw html.<br>
     *
     * Headers adapted from actual POST request used by Oscar.
     *
     * @since   1.0.0
     * @access  private
     * @param   {string}            term    Term to get courses for.
     * @return  {Promise<string>}           Promise of courses raw html.
     */
    private async _getCoursesPromise(term: string): Promise<string> {
        let response: Response = await fetch(COURSE_URI, {
            method: "POST",
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'max-age=0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'oscar.gatech.edu',
                'Origin': 'https://oscar.gatech.edu',
                'Referer': 'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_cat_term_date',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
            },
            body: this._getFormData(term)
        })
        return response.text();
    }

    /*
     * Returns request FormData as encoded string.<br>
     *
     * Key/value combinations adapted from actual POST request used by Oscar.
     *
     * @since   1.0.0
     * @access  private
     * @param   {string}    term    Term to create FormData for.
     * @return  {string}            Encoded Formdata body.
     */
    private _getFormData(term: string): string {
        let baseForm: Record<string, string> = {
            sel_subj: 'dummy',
            sel_day: 'dummy',
            sel_schd: 'dummy',
            sel_insm: 'dummy',
            sel_camp: 'dummy',
            sel_levl: 'dummy',
            sel_sess: 'dummy',
            sel_instr: 'dummy',
            sel_ptrm: 'dummy',
            sel_attr: 'dummy'
        }
        let form: Record<string, string> = {
            term_in: term,
            sel_subj: '',
            sel_crse: '',
            sel_title: '',
            sel_schd: '%',
            sel_from_cred: '',
            sel_to_cred: '',
            sel_camp: '%',
            sel_ptrm: '%',
            sel_instr: '%',
            sel_attr: '%',
            begin_hh: '0',
            begin_mi: '0',
            begin_ap: 'a',
            end_hh: '0',
            end_mi: '0',
            end_ap: 'a'
        }
        return [Object.keys(baseForm)
            .flatMap(key => `${key}=${encodeURIComponent(baseForm[key])}`).join("&"), Object.keys(form)
            .flatMap(key => `${key}=${encodeURIComponent(form[key])}`).join("&")].join("&");
    }

    /*
     * Returns Promise representing Record of all courses for given term.
     *
     * @since   1.0.0
     * @access  public
     * @param   {string}                                            term    Term to get course Record for.
     * @return  {Promise<Record<string, Record<string, Object>>>}           Record Promise for all courses.
     */
    public async getCourses(term: string): Promise<Record<string, Record<string, Object>>> {
        let coursesRawHtml: string = await this._getCoursesPromise(term);

        return this.courseAcquisitionUtility.getAllCourses(coursesRawHtml);
    }
}

export default CourseService;
