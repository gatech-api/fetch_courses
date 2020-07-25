import Instructor from "./Instructor.js";

class Class {
    private time: string | undefined;
    private schedule: string | undefined;
    private location: string | undefined;
    private dateRange: string | undefined;
    private instructor: Instructor | undefined;

    public getTime(): string {
        return this.time ? this.time : "";
    }

    public getSchedule(): string {
        return this.schedule ? this.schedule : "";
    }

    public getLocation(): string {
        return this.location ? this.location : "";
    }

    public getDateRange(): string {
        return this.dateRange ? this.dateRange : "";
    }

    public getInstructor(): Instructor {
        return this.instructor ? this.instructor : new Instructor();
    }

    public setTime(time: string): Class {
        this.time = time;
        return this;
    }
    
    public setSchedule(schedule: string): Class {
        this.schedule = schedule;
        return this;
    }

    public setLocation(location: string): Class {
        this.location = location;
        return this;
    }

    public setDateRange(dateRange: string): Class {
        this.dateRange = dateRange;
        return this;
    }

    public setInstructor(instructor: Instructor): Class {
        this.instructor = instructor;
        return this;
    }
}

export default Class;
