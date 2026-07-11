import { GraphQLEnumType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../../common/enums";
import { HydratedDocument } from "mongoose";
import { IUser } from "../../../common/interfaces";

export const GenderGQLEnumType = new GraphQLEnumType({
    name: 'GenderGQLEnumType',
    values: {
        Male: { value: GenderEnum.MALE },
        Femela: { value: GenderEnum.FEMALE }
    }
})
export const ProviderGQLEnumType = new GraphQLEnumType({
    name: 'ProviderGQLEnumType',
    values: {
        Google: { value: ProviderEnum.GOOGLE },
        System: { value: ProviderEnum.SYSTEM }
    }
})
export const RoleGQLEnumType = new GraphQLEnumType({
    name: 'RoleGQLEnumType',
    values: {
        Admin: { value: RoleEnum.ADMIN },
        User: { value: RoleEnum.USER }
    }
})

export const OneUserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'OneUserType',
    fields: ()=>({
                
                    _id: { type: new GraphQLNonNull(GraphQLID) },
                    firstName: { 
                        type: new GraphQLNonNull(GraphQLString),
                        resolve: (parent: HydratedDocument<IUser>) => {
                            console.log(parent);
                            return parent.username;
                            
                        }
                     },
                    lastName: { type: new GraphQLNonNull(GraphQLString) },
                    slug: { type: new GraphQLNonNull(GraphQLString) },
                    username: { type: GraphQLString },
                    password: { type: GraphQLString },
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    phone: { type: GraphQLString },
                    profilePicture: { type: GraphQLString },
                    profileCoverPictures: { type: new GraphQLList(GraphQLString) },

                    changeCredentialsTime: { type: GraphQLString },
                    DOB: { type: GraphQLString },
                    confirmEmail: { type: GraphQLString },
                    deletedAt: { type: GraphQLString },
                    restoredAt: { type: GraphQLString },

                        createdAt: { type: new GraphQLNonNull(GraphQLString) },
                    updatedAt: { type: GraphQLString },
                    
                    gender: {type: GenderGQLEnumType},
                    role: {type: RoleGQLEnumType},
                    provider: {type: ProviderGQLEnumType},

                    friends:{type: new GraphQLList(OneUserType)}            
            })
    })


export const profile = new GraphQLNonNull(new GraphQLObjectType({
    name: "ProfileResponse",
    description: "",
    fields: {
        message: { type: new GraphQLNonNull(GraphQLString) },
        data: {
            type: OneUserType
        }
    }
}))