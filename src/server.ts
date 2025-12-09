import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { schema } from "./schema.ts"
import mongoose from "mongoose"

await mongoose.connect('mongodb://localhost:27017/trelloLike')
console.log('mongodb connected')

const server = new ApolloServer({
    schema
})

const { url } = await startStandaloneServer(server)
console.log(`server ready ${url}`)