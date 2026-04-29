import { jest } from "@jest/globals"
import { UserController } from "./UserController.ts"
import type { UserService } from "../services/UserService.ts"
import { makeMockResponse } from "../__mocks__/mockResponse.mock.ts"
import type { Request } from "express"

describe("UserController", () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService)

    it("Deve adicionar um novo usuário", () => {
        const mockRequest = {
            body: {
                name: "Giulliano",
                email: "giulliano@teste.com"
            }
        } as Request

        const mockResponse = makeMockResponse()
        const response = userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: "Usuário criado" })
    })
})