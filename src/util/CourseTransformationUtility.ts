import CourseRow from "../dao/CourseRow.js";
import Course from "../dto/Course";
import Class from "../dto/Class";

class CourseTransformationUtility {

    public transformToFlatStructure(courses: Record<string, Record<string, any>>): Array<CourseRow> {
        let flatCourses: Array<CourseRow> = [];

        for (let courseCode in courses) {
            let currentCourseMeta: Record<string, any> = courses[courseCode];
            let courseName: string = <string>currentCourseMeta.name;

            for(let courseSection in currentCourseMeta.sections) {
                let currentCourse: Course = currentCourseMeta.sections[courseSection];
                currentCourse.getClasses().forEach((courseClass: Class) => {
                    flatCourses.push(new CourseRow()
                        .setCode(courseCode)
                        .setName(courseName)
                        .setSection(courseSection)
                        .setRegistrationNumber(currentCourse.getRegistrationNumber())
                        .setAttributes(currentCourse.getAttributes().join(','))
                        .setCredits(currentCourse.getCredits())
                        .setGradeBasis(currentCourse.getGradeBasis())
                        .setCampus(currentCourse.getCampus())
                        .setFormat(currentCourse.getFormat())
                        .setClassTime(courseClass.getTime())
                        .setClassSchedule(courseClass.getSchedule())
                        .setClassLocation(courseClass.getLocation())
                        .setClassDateRange(courseClass.getDateRange())
                        .setInstructorName(courseClass.getInstructor().getName())
                        .setInstructorEmail(courseClass.getInstructor().getEmail()))
                })
            }
        }

        return flatCourses;
    }
}

export default CourseTransformationUtility;
