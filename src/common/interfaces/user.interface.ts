import { Types } from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../common/enums";

export interface IUser {

    firstName: string;
    lastName: string;
    slug: string;
    username?: string;
    friends?: Types.ObjectId[] | IUser[]
    email: string;
    phone?: string;

    password: string;
    profilePicture?: string;
    profileCoverPictures?: string[];

    gender: GenderEnum,
    role: RoleEnum,
    provider: ProviderEnum

    changeCredentialsTime?: Date;
    DOB?: Date;
    confirmEmail?: Date;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    restoredAt?: Date;


}
