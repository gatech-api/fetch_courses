class Instructor {

    private name: string | undefined;
    private email: string | undefined;

    public getName(): string {
        return this.name ? this.name : "";
    }

    public getEmail(): string {
        return this.email ? this.email : "";
    }

    public setName(name: string): Instructor {
        this.name = name;
        return this;
    }
    
    public setEmail(email: string): Instructor {
        this.email = email;
        return this;
    }
}

export default Instructor;
