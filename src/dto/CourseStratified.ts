import ClassStratified from "./ClassStratified.js";


class CourseStratified {
    private registrationNumber: string | undefined;
    private attributes: Array<string> | undefined;
    private credits: number | undefined;
    private gradeBasis: string | undefined;
    private campus: string | undefined;
    private format: string | undefined;
    private classes: Array<ClassStratified> | undefined;

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

    public getClasses(): Array<ClassStratified> {
        return this.classes ? this.classes : [];
    }

    public setRegistrationNumber(registrationNumber: string): CourseStratified {
        this.registrationNumber = registrationNumber;
        return this;
    }

    public setAttributes(attributes: Array<string>): CourseStratified {
        this.attributes = attributes;
        return this;
    }

    public setCredits(credits: number): CourseStratified {
        this.credits = credits;
        return this;
    }

    public setGradeBasis(gradeBasis: string): CourseStratified {
        this.gradeBasis = gradeBasis;
        return this;
    }

    public setCampus(campus: string): CourseStratified {
        this.campus = campus;
        return this;
    }
    
    public setClasses(classes: Array<ClassStratified>): CourseStratified {
        this.classes = classes;
        return this;
    }

    public setFormat(format: string): CourseStratified {
        this.format = format;
        return this;
    }
}

export default CourseStratified;
