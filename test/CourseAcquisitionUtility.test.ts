import test from 'ava';
import CourseAcquisitionUtility from "../src/CourseAcquisitionUtility.js";
import Course from "../src/dto/Course.js";
import Class from "../src/dto/Class.js";
import Instructor from "../src/dto/Instructor.js";


let courseAcquisitionUtility: CourseAcquisitionUtility;

const NAME_A: string = "Special Topics";
const CRN_A: string = "92549";
const CODE_A: string = "WOLO 1801";
const SECTION_A: string = "A";

const ATTRIBUTES_A: string = "Hybrid Course";
const CAMPUS_A: string = "Georgia Tech-Atlanta *";
const FORMAT_A: string = "Lecture*";
const CREDITS_A: string = "1.000";
const GRADEBASIS_A: string = "ALP";
const TIME_A: string = "5:00 pm - 5:50 pm";
const SCHEDULE_A: string = "M";
const LOCATION_A: string = "D. M. Smith 208";
const DATERANGE_A: string = "Aug 17, 2020 - Dec 10, 2020";
const INSTRUCTOR_A: string = "Samba Ali  Sy";
const INSTRUCTOR_A_EXPECTED: string = "Samba Ali Sy";
const EMAIL_A: string = "samba.sy@modlangs.gatech.edu";

test.beforeEach(t => {
    courseAcquisitionUtility = new CourseAcquisitionUtility();
})

test('CourseAcquisitionUtility should return empty Record with empty input', t => {
    //Given
    let data: string = '';

    //When
    let actual: Record<string, Record<string, Object>> = courseAcquisitionUtility.getAllCourses(data);

    //Then
    t.falsy(Object.keys(actual).length);
})

test('CourseAcquisitionUtility should return correct Record of Courses for valid input', t => {
    //Given
    let data: string = `
<caption class="captiontext">Sections Found</caption>
<tr>\n<th CLASS="ddtitle" scope="colgroup" >
<th CLASS="ddtitle" scope="colgroup" ><a href="/pls/bprod/bwckschd.p_disp_detail_sched?term_in=202008&amp;crn_in=92549">${NAME_A} - ${CRN_A} - ${CODE_A} - ${SECTION_A}</a></th>
</tr>
<tr>
<TD CLASS="dddefault">
<SPAN class="fieldlabeltext">Long Title: </SPAN>Elementary Wolof
<br />
<SPAN class="fieldlabeltext">Associated Term: </SPAN>Fall 2020
<br />
<SPAN class="fieldlabeltext">Registration Dates: </SPAN>Mar 23, 2020 to Aug 21, 2020
<br />
<SPAN class="fieldlabeltext">Levels: </SPAN>Graduate Semester, Undergraduate Semester
<br />
<SPAN class="fieldlabeltext">Attributes: </SPAN>${ATTRIBUTES_A}
<br />
<br />
${CAMPUS_A} Campus
<br />
${FORMAT_A} Schedule Type
<br />
Partially at a Distance (BOR) Instructional Method
<br />
       ${CREDITS_A} Credits
<br />
<SPAN class="fieldlabeltext">Grade Basis: </SPAN>${GRADEBASIS_A}
<br />
<a href="/pls/bprod/bwckctlg.p_display_courses?term_in=202008&amp;one_subj=WOLO&amp;sel_crse_strt=1801&amp;sel_crse_end=1801&amp;sel_subj=&amp;sel_levl=&amp;sel_schd=&amp;sel_coll=&amp;sel_divs=&amp;sel_dept=&amp;sel_attr=">View Cat
alog Entry</a>
<br />
<br />
<table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
<tr>
<th CLASS="ddheader" scope="col" >Type</th>
<th CLASS="ddheader" scope="col" >Time</th>
<th CLASS="ddheader" scope="col" >Days</th>
<th CLASS="ddheader" scope="col" >Where</th>
<th CLASS="ddheader" scope="col" >Date Range</th>
<th CLASS="ddheader" scope="col" >Schedule Type</th>
<th CLASS="ddheader" scope="col" >Instructors</th>
</tr>
<tr>
<td CLASS="dddefault">Class</td>
<td CLASS="dddefault">${TIME_A}</td>
<td CLASS="dddefault">${SCHEDULE_A}</td>
<td CLASS="dddefault">${LOCATION_A}</td>
<td CLASS="dddefault">${DATERANGE_A}</td>
<td CLASS="dddefault">Lecture*</td>
<td CLASS="dddefault">${INSTRUCTOR_A} (<ABBR title= "Primary">P</ABBR>)<a href="mailto:${EMAIL_A}"    target="Samba A. Sy" ><img src="/wtlgifs/web_email.gif" align="middle" alt="E-mail" CLASS="headerImg" TITLE="E-mai
l"  NAME="web_email" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=28 WIDTH=28 /></a></td>
</tr>
</table>
<br />
<br />
</TD>
</tr>
</table>
<table  CLASS="datadisplaytable" summary="This is for formatting of the bottom links." WIDTH="50%">
    `

    //When
    let actual: Record<string, Record<string, Object>> = courseAcquisitionUtility.getAllCourses(data);

    //Then
    t.deepEqual(actual, {
        [CODE_A]: {
            name: NAME_A,
            sections: {
                [SECTION_A]: new Course()
                    .setRegistrationNumber(CRN_A)
                    .setAttributes([ATTRIBUTES_A])
                    .setCredits(parseInt(CREDITS_A))
                    .setGradeBasis(GRADEBASIS_A)
                    .setCampus(CAMPUS_A)
                    .setFormat(FORMAT_A)
                    .setClasses([
                        new Class()
                            .setTime(TIME_A)
                            .setSchedule(SCHEDULE_A)
                            .setLocation(LOCATION_A)
                            .setDateRange(DATERANGE_A)
                            .setInstructor(new Instructor()
                                .setName(INSTRUCTOR_A_EXPECTED)
                                .setEmail(EMAIL_A))
                    ])
            }
        }
    })
})
