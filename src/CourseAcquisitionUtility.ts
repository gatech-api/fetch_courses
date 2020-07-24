import Course from "./dto/Course.js";
import Class from "./dto/Class.js";
import Instructor from "./dto/Instructor.js";

class CourseAcquisitionUtility {

    private SEPARATOR: string = " - ";

    /*
     * Returns match value with control for no match.
     *
     * @since   1.0.0
     * @access  private
     * @param   {string}        html        Raw html.
     * @param   {RegExp}        regexp      Regular expression (match must be group 1).
     * @return  {string}                    Match string if found, otherwise empty string.
     */
    _conditionalMatch(html: string, regexp: RegExp): string {
        let match = html.matchAll(regexp).next().value;
        return match ? match[1] : "";
    }

    /*
     * Returns array of string containing course name, registration number, code, and section.<br>
     *
     * Using custom regex, one matching group containing all relevant information in the header is derived.<br>
     * (ex.) "Special Topics - 92549 - WOLO 1801 - A"<br>
     *                      ^       ^           ^
     * Iteratively, indexes of delimiters are parsed out (building on each other), ensuring the integrity of the course
     * name, which may contain irrelevant copies of the delimiter. With those indices, the matching group can be sliced
     * and returned accordingly.<br>
     *
     * @since   1.0.0
     * @access  private
     * @param   {string}        headerElement   Raw html of course header.
     * @return  {Array<string>}                 Array of string representing header values.
     */
    _acquireHeaderData(headerElement: string): Array<string> {
        const header: string = headerElement.matchAll(/crn_in=\d+">(.*)<\/a>/g).next().value[1];
        const sectionIndex: number = header.lastIndexOf(this.SEPARATOR);
        const codeIndex: number = header.slice(0, sectionIndex).lastIndexOf(this.SEPARATOR);
        const crnIndex: number = header.slice(0, codeIndex).lastIndexOf(this.SEPARATOR);

        const name: string = header.slice(0, crnIndex);
        const registrationNumber: string = header.slice(crnIndex+ 3, codeIndex);
        const code: string = header.slice(codeIndex + 3, sectionIndex);
        const section: string = header.slice(sectionIndex + 3);

        return [name, registrationNumber, code, section];
    }

    /*
     * Returns array of string containing course attributes, gradeBasis, credits, campus, and format.
     *
     * @since   1.0.0
     * @access  private
     * @param   {string}        bodyElement     Raw html of course body.
     * @return  {Array<string>}                 Array of string representing body values.
     */
    _acquireBodyData(bodyElement: string): Array<string> {
        const bodyAttributes: IterableIterator<RegExpMatchArray> = bodyElement.matchAll(/^<SPAN class="fieldlabeltext">(.*): <\/SPAN>(.+)$/gm);

        let matchingAttributes: Record<string, string> = {};
        let match = bodyAttributes.next();
        while(!match.done) {
            matchingAttributes[match.value[1]] = match.value[2]
                .split(',')
                .flatMap((name: string) => name.replace(/\(\w\)/g, '').replace(/\s\s+/g, ' ').trim()).join(',');
            match = bodyAttributes.next();
        }

        const attributes: string = Object.keys(matchingAttributes).includes("Attributes") ? matchingAttributes["Attributes"] : "";
        const gradeBasis: string = Object.keys(matchingAttributes).includes("Grade Basis") ? matchingAttributes["Grade Basis"] : "";

        const credits: string = bodyElement.matchAll(/\d+\.\d+(?=\s+Credits)/g).next().value[0];
        const campus: string = this._conditionalMatch(bodyElement, /^(.*) Campus$/gm);
        const format: string = this._conditionalMatch(bodyElement, /^(.*) Schedule Type$/gm);

        return [attributes, gradeBasis, credits, campus, format];
    }

    /*
     * Returns array of Class containing course attributes time, schedule, location, dateRange, instructorName, instructorEmail.<br>
     *
     * Each table row of class metadata is flatmapped into an Array of Courses by doing an elementary html strip and
     * some more nuanced regexp to find instructor email (which is inside the html).<br>
     *
     * @since   1.0.0
     * @access  private
     * @param   {Array<string>} tableElements   Raw html of course metadata.
     * @return  {Array<Class>}                  Array of Class.
     */
    _acquireTableData(tableElements: Array<string>): Array<Class> {
        return tableElements.flatMap((tableElement: string) => {
            let [, classTime, classSchedule, classLocation, classDateRange, ,instructorName] = tableElement
                .split('\n')
                .slice(0, 7)
                .flatMap((columnHtml: string) => columnHtml.replace(/<\/?[^>]+(>|$)/g, ''))

            instructorName = instructorName
                .split(',')
                .flatMap((name: string) => name.replace(/\(\w\)/g, '').replace(/\s\s+/g, ' ').trim()).join(',');

            const emailMatches = tableElement.matchAll(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g);
            let emails = [];
            let match = emailMatches.next();
            while(!match.done) {
                emails.push(match.value[1]);
                match = emailMatches.next();
            }
            const instructorEmail = emails.join(',');
            return new Class()
                .setTime(classTime)
                .setSchedule(classSchedule)
                .setLocation(classLocation)
                .setDateRange(classDateRange)
                .setInstructor(new Instructor()
                    .setName(instructorName)
                    .setEmail(instructorEmail));
        })
    }

    /*
     * Returns all course data in organized Record format.
     *
     * @since   1.0.0
     * @access  public
     * @param   {string}                                    data    Raw course html.
     * @return  {Record<string, Record<string, Object>>}            Course Record.
     */
    getAllCourses(data: string): Record<string, Record<string, Object>> {
        const leftBound: number = data.indexOf('<caption class="captiontext">Sections Found</caption>');
        const rightBound: number = data.lastIndexOf('<table  CLASS="datadisplaytable" summary="This is for formatting of the bottom links." WIDTH="50%">');
        const coursesRaw: Array<string> = data.slice(leftBound, rightBound).split('<tr>\n<th CLASS="ddtitle" scope="colgroup" >').slice(1);

        let coursesFinal: Record<string, Record<string, any>> = {};

        coursesRaw.forEach((course: string) => {
            const splitByTableRow: Array<string> = course.split('<tr>\n');

            const [name, registrationNumber, code, section] = this._acquireHeaderData(splitByTableRow[0]);
            const [attributes, gradeBasis, credits, campus, format] = this._acquireBodyData(splitByTableRow[1]);
            const classes = this._acquireTableData(splitByTableRow.slice(3));

            if(!(code in coursesFinal)) {
                coursesFinal[code] = {
                    name: name,
                    sections: {}
                }
            }
            coursesFinal[code].sections[section] = new Course()
                .setRegistrationNumber(registrationNumber)
                .setAttributes(attributes.split(',').flatMap((attribute: string) => attribute.trim()))
                .setCredits(parseInt(credits))
                .setGradeBasis(gradeBasis)
                .setCampus(campus)
                .setFormat(format)
                .setClasses(classes)
        })

        return coursesFinal;
    }
}

export default CourseAcquisitionUtility;
