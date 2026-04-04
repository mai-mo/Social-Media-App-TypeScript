

class Person{

    // Option 1
    // public username: string;
    // constructor(name: string) {
    //     this.username = name
    // }

    // Option 2
    constructor(public username: string){

    }
    getName(): string {
        return `Hello ${this.username}`
    }

}

const person = new Person("ali");
console.log(person.getName());
