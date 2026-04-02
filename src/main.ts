let x = "Hello World";


enum GenderEnum {
    Male,
    Female
}
type str = string
type LastNameType = str | number
type FullNameType = {
    firstname: string;
    lastname: LastNameType;
}
type UserType = {
    username: FullNameType,
    email: string,
    age: number,
    gender: GenderEnum,
    confirm: boolean,
}

let user: UserType & { password: string } = {
    username: {
        firstname: "Mai",
        lastname: "Mohamed"
    },
    email: "mai@gmail.com",
    age: 26,
    gender: GenderEnum.Female,
    confirm: true,
    password: "Lolo"
}

console.log(user.username);

const colors = ["red color", "green color", 25, "black color"]
for( let i = 0; i < colors.length; i++){
    console.log((colors[i] as string).split(" "))
}

