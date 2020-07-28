/* Copyright © 2020 Gatech-API - All Rights Reserved. Subject to terms of the PolyForm Noncommercial License. */
import Course from "../dao/Course.js";
import CourseStratified from "../dto/CourseStratified.js";
import ClassStratified from "../dto/ClassStratified.js";
import Class from "../dao/Class.js";

class CourseTransformationUtility {

    private flatCourses: Array<Course> | undefined;
    private flatClasses: Array<Class> | undefined;

    public getFlatCourses(): Array<Course> {
        return this.flatCourses ? this.flatCourses : [];
    }

    public getFlatClasses(): Array<Class> {
        return this.flatClasses ? this.flatClasses : [];
    }

    /**
     * Void process that saves both flat course and class mappings as class attributes for subsequent reference
     *
     * @since   1.0.0
     * @param   courses
     */
    public transformToFlatStructure(courses: Record<string, Record<string, any>>): void {
        this.flatCourses = [];
        this.flatClasses = [];
        for (let courseCode in courses) {
            let currentCourseMeta: Record<string, any> = courses[courseCode];
            let courseName: string = <string>currentCourseMeta.name;

            for(let courseSection in currentCourseMeta.sections) {
                let currentCourse: CourseStratified = currentCourseMeta.sections[courseSection];
                this.flatCourses.push(new Course()
                    .setCode(courseCode)
                    .setName(courseName)
                    .setSection(courseSection)
                    .setRegistrationNumber(currentCourse.getRegistrationNumber())
                    .setAttributes(currentCourse.getAttributes().join(','))
                    .setCredits(currentCourse.getCredits())
                    .setGradeBasis(currentCourse.getGradeBasis())
                    .setCampus(currentCourse.getCampus())
                    .setFormat(currentCourse.getFormat()))
                currentCourse.getClasses().forEach((courseClass: ClassStratified) => {
                    // @ts-ignore
                    this.flatClasses.push(new Class()
                        .setRegistrationNumber(currentCourse.getRegistrationNumber())
                        .setClassTime(courseClass.getTime())
                        .setClassSchedule(courseClass.getSchedule())
                        .setClassLocation(courseClass.getLocation())
                        .setClassDateRange(courseClass.getDateRange())
                        .setInstructorName(courseClass.getInstructor().getName())
                        .setInstructorEmail(courseClass.getInstructor().getEmail()));
                });
            }
        }
    }
}

export default CourseTransformationUtility;
