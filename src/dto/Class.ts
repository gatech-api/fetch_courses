import Instructor from "./Instructor";

class Class {
    public time: string | undefined;
    public schedule: string | undefined;
    public location: string | undefined;
    public dateRange: string | undefined;
    public instructor: Instructor | undefined;

    setTime(time: string): Class {
        this.time = time;
        return this;
    }
    
    setSchedule(schedule: string): Class {
        this.schedule = schedule;
        return this;
    }

    setLocation(location: string): Class {
        this.location = location;
        return this;
    }

    setDateRange(dateRange: string): Class {
        this.dateRange = dateRange;
        return this;
    }

    setInstructor(instructor: Instructor): Class {
        this.instructor = instructor;
        return this;
    }
}

export default Class;
