import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users=[
    {id:"1", name:"John Doe" ,age: 25 ,isMarried:false},
    {id:"2", name:"Kate Doe" ,age: 35 ,isMarried:true}
]

const typeDefs = `
    type Query{
        getUsers: [User]
        getUserById(id: ID!): User
    }

    type Mutation{
       createUser(name:String!,age:Int!,isMarried:Boolean!):User 
    }
    type User{
        id: ID
        name: String
        age: Int
        isMarried: Boolean
    }
`;
const resolvers = {
    Query:{
        getUsers:()=>{
            return users;
        },
        getUserById:(parent,args)=>{
            const id=args.id;
            return users.find((user)=> user.id ===id);
        }
    },
    Mutation:{
        createUser:(parent,args)=>{
            const {name,age,isMarried}=args;
            const newUser={
                id:(users.length+1).toString(),
                name,
                age,
                isMarried
            };
            users.push(newUser);
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`server running at: ${url}`);
