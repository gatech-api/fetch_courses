class Instructor {

    public name: string | undefined;
    public email: string | undefined;

    setName(name: string): Instructor {
        this.name = name;
        return this;
    }
    
    setEmail(email: string): Instructor {
        this.email = email;
        return this;
    }
}

export default Instructor;
