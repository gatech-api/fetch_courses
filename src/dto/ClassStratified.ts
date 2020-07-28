/* Copyright © 2020 Gatech-API - All Rights Reserved. Subject to terms of the PolyForm Noncommercial License. */
import Instructor from "./Instructor.js";

class ClassStratified {
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

    public setTime(time: string): ClassStratified {
        this.time = time;
        return this;
    }
    
    public setSchedule(schedule: string): ClassStratified {
        this.schedule = schedule;
        return this;
    }

    public setLocation(location: string): ClassStratified {
        this.location = location;
        return this;
    }

    public setDateRange(dateRange: string): ClassStratified {
        this.dateRange = dateRange;
        return this;
    }

    public setInstructor(instructor: Instructor): ClassStratified {
        this.instructor = instructor;
        return this;
    }
}

export default ClassStratified;
