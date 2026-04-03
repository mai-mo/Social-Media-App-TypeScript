
interface IUser{
    name: string,
    DOB: number,
    age: (currentYear: number)=> number
}

const user: IUser = {
    name: "Ahmed",
    DOB: 2000,
    age: function(this: IUser, currentYear: number) {
        return currentYear - this.DOB;
    }
}

const user2:IUser = {
    name: "Mai",
    DOB: 2002,
    
} 

console.log(user.age(2026))