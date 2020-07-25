class Courses {
    private code: string | undefined;
    private name: string | undefined;
    private section: string | undefined;
    private registrationNumber: string | undefined;
    private attributes: string | undefined;
    private credits: number | undefined;
    private gradeBasis: string | undefined;
    private campus: string | undefined;
    private format: string | undefined;
    private classTime: string | undefined;
    private classSchedule: string | undefined;
    private classLocation: string | undefined;
    private classDateRange: string | undefined;
    private instructorName: string | undefined;
    private instructorEmail: string | undefined;

    public getRegistrationNumber(): string {
        return this.registrationNumber ? this.registrationNumber : "";
    }

    public getAttributes(): string {
        return this.attributes ? this.attributes : "";
    }

    public setCode(code: string): Courses {
        this.code = code;
        return this;
    }

    public setName(name: string): Courses {
        this.name = name;
        return this;
    }

    public setSection(section: string): Courses {
        this.section = section;
        return this;
    }

    public setRegistrationNumber(registrationNumber: string): Courses {
        this.registrationNumber = registrationNumber;
        return this;
    }

    public setAttributes(attributes: string): Courses {
        this.attributes = attributes;
        return this;
    }

    public setCredits(credits: number): Courses {
        this.credits = credits;
        return this;
    }

    public setGradeBasis(gradeBasis: string): Courses {
        this.gradeBasis = gradeBasis;
        return this;
    }

    public setCampus(campus: string): Courses {
        this.campus = campus;
        return this;
    }

    public setFormat(format: string): Courses {
        this.format = format;
        return this;
    }

    public setClassTime(time: string): Courses {
        this.classTime = time;
        return this;
    }

    public setClassSchedule(schedule: string): Courses {
        this.classSchedule = schedule;
        return this;
    }

    public setClassLocation(location: string): Courses {
        this.classLocation = location;
        return this;
    }

    public setClassDateRange(dateRange: string): Courses {
        this.classDateRange = dateRange;
        return this;
    }

    public setInstructorName(name: string): Courses {
        this.instructorName = name;
        return this;
    }

    public setInstructorEmail(email: string): Courses {
        this.instructorEmail = email;
        return this;
    }
}

export default Courses;
