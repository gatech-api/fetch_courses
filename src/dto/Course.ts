import Class from "./Class.js";


class Course {
    public registrationNumber: string | undefined;
    public attributes: string | undefined;
    public credits: number | undefined;
    public gradeBasis: string | undefined;
    public campus: string | undefined;
    public format: string | undefined;
    public classes: Array<Class> | undefined;

    setRegistrationNumber(registrationNumber: string): Course {
        this.registrationNumber = registrationNumber;
        return this;
    }

    setAttributes(attributes: string): Course {
        this.attributes = attributes;
        return this;
    }

    setCredits(credits: number): Course {
        this.credits = credits;
        return this;
    }

    setGradeBasis(gradeBasis: string): Course {
        this.gradeBasis = gradeBasis;
        return this;
    }

    setCampus(campus: string): Course {
        this.campus = campus;
        return this;
    }
    
    setClasses(classes: Array<Class>): Course {
        this.classes = classes;
        return this;
    }

    setFormat(format: string): Course {
        this.format = format;
        return this;
    }
}

export default Course;
