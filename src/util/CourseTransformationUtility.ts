import Courses from "../dao/Courses.js";
import CourseStratified from "../dto/CourseStratified";
import ClassStratified from "../dto/ClassStratified";

class CourseTransformationUtility {

    public transformToFlatStructure(courses: Record<string, Record<string, any>>): Array<Courses> {
        let flatCourses: Array<Courses> = [];

        for (let courseCode in courses) {
            let currentCourseMeta: Record<string, any> = courses[courseCode];
            let courseName: string = <string>currentCourseMeta.name;

            for(let courseSection in currentCourseMeta.sections) {
                let currentCourse: CourseStratified = currentCourseMeta.sections[courseSection];
                currentCourse.getClasses().forEach((courseClass: ClassStratified) => {
                    flatCourses.push(new Courses()
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
