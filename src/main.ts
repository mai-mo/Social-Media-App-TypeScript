
class Person{
    // public userName:string
    // constructor(name: string){
    //     this.userName = name
    // },
    // getName(): string{
    // return `Hello, ${this.userName}`
    // }
    public get password(): string{
        return this._password
    }
    public set password(value: string){
        this._password = value
    }
    constructor(public username: string, private _password: string){
    }
    getName(): string{
        return `Hello ${this.username}`
    }
    public updatePassword(value:string): void{
        this._password = value
    }
    public getPassword(): string {
        return this.password
    }
}

class User extends Person{
    constructor( username:string, password: string){
        super(username, password)
    }
}


const person = new Person("M", "123")
console.log(person.getName())
console.log(person.password);
person.password= "xsd";
console.log(person.password);
