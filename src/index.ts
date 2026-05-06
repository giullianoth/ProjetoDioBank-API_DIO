import "reflect-metadata"
import { AppDataSource } from "./database/index.ts"
import express, { type Request, type Response } from "express"
import router from "./routes.js"

const server = express()

try {
    await AppDataSource.initialize()
    console.log("Data Source inicializado!")
} catch (error) {
    console.error(error)
}

server.use(express.json())
server.use(router)

server.get("/", (request: Request, response: Response) => {
    return response.status(200).json({
        message: "API DioBank"
    })
})

server.listen(5000, () => {
    console.log("Servidor rodando na porta 5000")
})