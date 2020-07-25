'use strict';

class Course extends Backendless.ServerCode.PersistenceItem {

    constructor(code, name, section, registrationNumber, attributes, credits, gradeBasis, campus, format) {
        super(code, name, section, registrationNumber, attributes, credits, gradeBasis, campus, format);

        /**
         * @type {String}
         */
        this.code = code || "";

        /**
         * @type {String}
         */
        this.name = name || "";

        /**
         * @type {String}
         */
        this.section = section || "";

        /**
         * @type {String}
         */
        this.registrationNumber = registrationNumber || "";

        /**
         * @type {String}
         */
        this.attributes = attributes || "";

        /**
         * @type {Number}
         */
        this.credits = credits || NaN;

        /**
         * @type {String}
         */
        this.gradeBasis = gradeBasis || "";

        /**
         * @type {String}
         */
        this.campus = campus || "";

        /**
         * @type {String}
         */
        this.format = format || "";
    }
}

module.exports = Backendless.ServerCode.addType(Course);
