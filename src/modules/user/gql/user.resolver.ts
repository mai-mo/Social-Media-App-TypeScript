import userService, { UserService } from "../user.service";
import { IUser } from "../../../common/interfaces";
import { IAuthUser } from "../../../common/types/express.types";
import { GQLAuthorization, GQLValidation } from "../../../middleware";
import { endpoint } from "../user.authorization";
import { profileGQL } from "../user.validation";

export class UserResolver {

    private service: UserService;
    constructor() {
        this.service = userService;
    }

    profile = async (parent: unknown, args: {search?: string}, {user}: IAuthUser): Promise<{ message: string, data: IUser }> => {
        await GQLAuthorization(endpoint.profile, user)
        await GQLValidation<{search?: string}>(profileGQL, args)
        const data = await this.service.profile(user)
        return {message:'Hi', data}
    }
    
}
export const userResolver = new UserResolver()