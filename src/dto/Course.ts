import Class from "./Class.js";


class Course {
    private registrationNumber: string | undefined;
    private attributes: Array<string> | undefined;
    private credits: number | undefined;
    private gradeBasis: string | undefined;
    private campus: string | undefined;
    private format: string | undefined;
    private classes: Array<Class> | undefined;

    public getRegistrationNumber(): string {
        return this.registrationNumber ? this.registrationNumber : "";
    }

    public getAttributes(): Array<string> {
        return this.attributes ? this.attributes : [];
    }

    public getCredits(): number {
        return this.credits ? this.credits : Number.NaN;
    }

    public getGradeBasis(): string {
        return this.gradeBasis ? this.gradeBasis : "";
    }

    public getCampus(): string {
        return this.campus ? this.campus : "";
    }

    public getFormat(): string {
        return this.format ? this.format : "";
    }

    public getClasses(): Array<Class> {
        return this.classes ? this.classes : [];
    }

    public setRegistrationNumber(registrationNumber: string): Course {
        this.registrationNumber = registrationNumber;
        return this;
    }

    public setAttributes(attributes: Array<string>): Course {
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
    
    public setClasses(classes: Array<Class>): Course {
        this.classes = classes;
        return this;
    }

    public setFormat(format: string): Course {
        this.format = format;
        return this;
    }
}

export default Course;
