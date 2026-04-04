// TYPEs support primitive and non primitive
// WITH TYPES 
// type LoginType = {
//     email: string,
//     password: string
// }

// type SignupType = LoginType & {
//     username: string,
// }

// type UserType = SignupType & {
//     id: number,
// }

// const users: UserType[] = [{ id: 1,username:"M", email: "m@gmail.com", password: "123" }]

// const signup = ({email, password, username}: SignupType): UserType => {
//     const user = { id: Date.now(),username, email, password }
//     users.push(user)
//     return user
// }

// const login = ({email, password}: LoginType): UserType | undefined=> {
    
//     const matchedAccount = users.find(user => {
//         return user.email === email && user.password === password
//     })
//     return matchedAccount
    
// }

// console.log(signup({email:"lol",username:"edd", password:"4878"}))
// console.log(login({email:"lol", password:"4878"}))


// Interface support non primitive

interface ILogin {
    email: string;
    password: string;
}

interface ISignup extends ILogin  {
    username: string,
}

interface UserType extends ISignup {
    id: number,
}

const users: UserType[] = [{ id: 1,username:"M", email: "m@gmail.com", password: "123" }]

const signup = ({email, password, username}: ISignup): UserType => {
    const user = { id: Date.now(),username, email, password }
    users.push(user)
    return user
}

const login = ({email, password}: ILogin): UserType | undefined=> {
    
    const matchedAccount = users.find(user => {
        return user.email === email && user.password === password
    })
    return matchedAccount
    
}

console.log(signup({email:"lol",username:"edd", password:"4878"}))
console.log(login({email:"lol", password:"4878"}))
