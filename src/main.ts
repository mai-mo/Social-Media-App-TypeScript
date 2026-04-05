
class Person{
    
    private static _count: number = 0;

    public get count(): number{
        return Person._count
    }

    public get password(): string{
        return this._password
    }
    public set password(value: string){
        this._password = value
    }
    constructor(public username: string, private _password: string, protected phone: string){
        Person._count++;
    }
    getName(): string{
        return `Hello ${this.username}`
    }
    public updatePassword(value:string): void{
        this._password = value
    }
    public getPassword(): string {
        return this._password
    }
}

class User extends Person{
    constructor( username:string, password: string, phone: string){
        super(username, password, phone)
    }
}


const user = new User("M", "123", "0112")
console.log(user)

const person = new Person("A", "456", "010")
console.log(person.count);
