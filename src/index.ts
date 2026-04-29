import express, { type Request, type Response } from "express"
import router from "./routes.js"

const server = express()
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