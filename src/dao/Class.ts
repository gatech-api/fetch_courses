/* Copyright © 2020 Gatech-API - All Rights Reserved. Subject to terms of the PolyForm Noncommercial License. */

class Class {
    private registrationNumber: string | undefined;
    private classTime: string | undefined;
    private classSchedule: string | undefined;
    private classLocation: string | undefined;
    private classDateRange: string | undefined;
    private instructorName: string | undefined;
    private instructorEmail: string | undefined;

    public setRegistrationNumber(registrationNumber: string): Class {
        this.registrationNumber = registrationNumber;
        return this;
    }

    public setClassTime(time: string): Class {
        this.classTime = time;
        return this;
    }

    public setClassSchedule(schedule: string): Class {
        this.classSchedule = schedule;
        return this;
    }

    public setClassLocation(location: string): Class {
        this.classLocation = location;
        return this;
    }

    public setClassDateRange(dateRange: string): Class {
        this.classDateRange = dateRange;
        return this;
    }

    public setInstructorName(name: string): Class {
        this.instructorName = name;
        return this;
    }

    public setInstructorEmail(email: string): Class {
        this.instructorEmail = email;
        return this;
    }
}

export default Class;
