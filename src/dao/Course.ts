/* Copyright © 2020 Gatech-API - All Rights Reserved. Subject to terms of the PolyForm Noncommercial License. */

class Course {
    private code: string | undefined;
    private name: string | undefined;
    private section: string | undefined;
    private registrationNumber: string | undefined;
    private attributes: string | undefined;
    private credits: number | undefined;
    private gradeBasis: string | undefined;
    private campus: string | undefined;
    private format: string | undefined;

    public getRegistrationNumber(): string {
        return this.registrationNumber ? this.registrationNumber : "";
    }

    public setCode(code: string): Course {
        this.code = code;
        return this;
    }

    public setName(name: string): Course {
        this.name = name;
        return this;
    }

    public setSection(section: string): Course {
        this.section = section;
        return this;
    }

    public setRegistrationNumber(registrationNumber: string): Course {
        this.registrationNumber = registrationNumber;
        return this;
    }

    public setAttributes(attributes: string): Course {
        this.attributes = attributes;
        return this;
    }

    public setCredits(credits: number): Course {
        this.credits = credits;
        return this;
    }

    public setGradeBasis(gradeBasis: string): Course {
        this.gradeBasis = gradeBasis;
        return this;
    }

    public setCampus(campus: string): Course {
        this.campus = campus;
        return this;
    }

    public setFormat(format: string): Course {
        this.format = format;
        return this;
    }
}

export default Course;
