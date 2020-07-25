class CourseRow {
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

    public setCode(code: string): CourseRow {
        this.code = code;
        return this;
    }

    public setName(name: string): CourseRow {
        this.name = name;
        return this;
    }

    public setSection(section: string): CourseRow {
        this.section = section;
        return this;
    }

    public setRegistrationNumber(registrationNumber: string): CourseRow {
        this.registrationNumber = registrationNumber;
        return this;
    }

    public setAttributes(attributes: string): CourseRow {
        this.attributes = attributes;
        return this;
    }

    public setCredits(credits: number): CourseRow {
        this.credits = credits;
        return this;
    }

    public setGradeBasis(gradeBasis: string): CourseRow {
        this.gradeBasis = gradeBasis;
        return this;
    }

    public setCampus(campus: string): CourseRow {
        this.campus = campus;
        return this;
    }

    public setFormat(format: string): CourseRow {
        this.format = format;
        return this;
    }

    public setClassTime(time: string): CourseRow {
        this.classTime = time;
        return this;
    }

    public setClassSchedule(schedule: string): CourseRow {
        this.classSchedule = schedule;
        return this;
    }

    public setClassLocation(location: string): CourseRow {
        this.classLocation = location;
        return this;
    }

    public setClassDateRange(dateRange: string): CourseRow {
        this.classDateRange = dateRange;
        return this;
    }

    public setInstructorName(name: string): CourseRow {
        this.instructorName = name;
        return this;
    }

    public setInstructorEmail(email: string): CourseRow {
        this.instructorEmail = email;
        return this;
    }
}

export default CourseRow;
