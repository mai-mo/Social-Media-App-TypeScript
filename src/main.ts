
interface IPerson {
    name: string,
    DOB: number,
    age: (currentYear: number)=> number
}

interface IUser extends IPerson{
    gender: number
}

const user: Partial<IUser> = {
    name: "Ahmed",
    DOB: 2000,
    age: function(this: IUser, currentYear: number) {
        return currentYear - this.DOB;
    },
}


console.log((user as IUser).age(2026))
