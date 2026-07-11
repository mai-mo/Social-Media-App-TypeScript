import { GraphQLString } from "graphql"
import * as UserGQLTypes from './user.types.gql'
import * as UserGQLArgs from './user.args.gql'
import { userResolver, UserResolver } from "./user.resolver";

export class UserGQLSchema {

    private userResolver: UserResolver;
    constructor() { 
        this.userResolver = userResolver
    }

    registerQuery() {
        return {
            profile: {
                type: UserGQLTypes.profile,
                description: 'Test profile point',
                args: UserGQLArgs.profile,
                resolve: this.userResolver.profile

            },
            welcome2: {
                type: GraphQLString,
                description: 'Test welcome2 point',
                resolve: () => {
                    return `Hello`
                }
            }
        }
    }

    registerMutation() {
        return {
            like: {
                type: GraphQLString,
                description: 'Test welcome3 point',
                resolve: () => {
                    return `Hi`
                }
            }
        }
    }

}

export const userGQLSchema = new UserGQLSchema()