import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userGQLSchema } from '../user';
import { postGQLSchema } from '../post';

// get
const query = new GraphQLObjectType({
    name: "Welcome",
    description: "Welcome",
    fields: {
        ...userGQLSchema.registerQuery(),
        ...postGQLSchema.registerQuery()
    }
})

// post , put , batch , delete
const mutation = new GraphQLObjectType({
    name: "Welcome2",
    description: "Welcome2",
    fields: {
        ...userGQLSchema.registerMutation()
    }
})

export const schema = new GraphQLSchema({query, mutation})