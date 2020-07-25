'use strict';


const Course = require('../models/Course');

class CourseService {

  getCoursesWhere(where) {
    let dataQueryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(where);
    return Course.find(dataQueryBuilder).then(courses => {
      return courses;
    });
  }

  /**
   * @param {Array.<Course>} courses
   * @returns {String}
   */
  sendCourses(courses) {
    console.log(courses)
    courses.forEach(course => {
      const courseInstance = new Course(course);
      courseInstance.save().catch(e => console.error(e));
    })
    return "";
  }

  /**
   * @returns {Promise<Array<Course>>}
   */
  getAllCourses() {
    return this.getCoursesWhere("1=1");
  }
}

CourseService.version = '1.0.0';

Backendless.ServerCode.addService(CourseService);
