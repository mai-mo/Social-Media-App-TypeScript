// import { BadRequestException } from "../../common/exceptions"

// import { HydratedDocument } from "mongoose";
import { LoginDto, SignupDto } from "./auth.dto"
import { IUser } from "../../common/interfaces";
import { BadRequestException, ConflictException } from "../../common/exceptions";
import { UserRepository } from "../../DB/repository";
import { generateEncryption, generateHash } from "../../common/utils/security";
import { emailTemplate, sendEmail } from "../../common/utils/email";
// import { ISignupResponse } from "./auth.entity";


export class AuthenticationService {

    private readonly userRepository: UserRepository;

    constructor() { 
        this.userRepository = new UserRepository()
    }

    public login(data: LoginDto): LoginDto {
        return data
    }

    public async signup({email, username, password, phone}: SignupDto): Promise<IUser> {

        // const [result]: HydratedDocument<IUser>[] = await this.userRepository.create([data]) || []

        const checkUserExist = await this.userRepository.findOne({
            filter: {email},
            projection: 'email',
            options: {lean: false}
        })

        console.log({checkUserExist});
        if(checkUserExist) {
            checkUserExist.email='Dew'; 
            await checkUserExist.save()
            throw new ConflictException('Email already Exists')
        }
        

        const user = await this.userRepository.createOne({
            data: {
                email,
                username,
                password: await generateHash({plaintext: password}),
                phone: phone? await generateEncryption(phone) : undefined
            }
        })

        if (!user) {
            throw new BadRequestException('Fail')
        }

        await sendEmail({ to: email, subject: 'Confirm Email', html: emailTemplate({code:256487, title: 'Verify Account'})})

        return user.toJSON()

    }

}

export default new AuthenticationService()

 
