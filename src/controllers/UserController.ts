import type { Request, Response } from "express"
import { UserService } from "../services/UserService.js"

export class UserController {
    userService: UserService

    constructor(userService = new UserService) {
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {
        const { body: user } = request

        if (!user.name) {
            return response.status(400).json({
                message: "Bad request: name is required"
            })
        }

        if (!user.email) {
            return response.status(400).json({
                message: "Bad request: email is required"
            })
        }

        this.userService.createUser(user.name, user.email)

        return response.status(201).json({
            message: "Usuário criado"
        })
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json(users)
    }
}