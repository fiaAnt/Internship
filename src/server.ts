import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { schema } from "./schema.ts"
import mongoose from "mongoose"

const connectToMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect('mongodb://localhost:27017/trelloLike')
        console.log('mongodb connected')

        mongoose.connection.on('error', (error: Error) => {
            console.error('ошибка подключения mongodb ', error.message)
        })
    } catch (error) {
        console.error('ошибка подключения к mongodb:', error instanceof Error ? error.message : String(error))
    }
}

await connectToMongoDB()

const server = new ApolloServer({
    schema,
    introspection: true,
    csrfPrevention: false,
    formatError: (error) => {
        console.error('GraphQL Error:', {
            message: error.message,
            path: error.path,
            code: error.extensions?.code
        });
        return {
            message: 'Внутренняя ошибка сервера',
            extensions: {
                code: 'INTERNAL_SERVER_ERROR'
            }
        }
    }
})

const { url } = await startStandaloneServer(server)
console.log(`server ready ${url}`)
console.log(`Apollo Sandbox: ${url}`)