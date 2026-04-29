import { jest } from "@jest/globals"
import { UserController } from "./UserController.ts"
import type { User, UserService } from "../services/UserService.ts"
import { makeMockResponse } from "../__mocks__/mockResponse.mock.ts"
import type { Request } from "express"

describe("UserController", () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: () => [] as User[],
    }

    const mockDb: User[] = []

    const userController = new UserController(mockUserService as UserService)
    const mockResponse = makeMockResponse()

    it("Deve adicionar um novo usuário", () => {
        const mockRequest = {
            body: {
                name: "Giulliano",
                email: "giulliano@teste.com"
            }
        } as Request

        const response = userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: "Usuário criado" })
    })

    it("Deve retornar um erro caso o nome não seja fornecido", () => {
        const mockRequest = {
            body: {
                email: "giulliano@teste.com"
            }
        } as Request

        const response = userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({
            message: "Bad request: nome é obrigatório"
        })
    })

    it("Deve retornar um erro caso o campo nome esteja vazio", () => {
        const mockRequest = {
            body: {
                name: "",
                email: "giulliano@teste.com"
            }
        } as Request

        const response = userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({
            message: "Bad request: nome é obrigatório"
        })
    })

    it("Deve retornar um array contendo a lista de usuários", () => {
        const response = userController.getAllUsers({} as Request, mockResponse)

        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject(mockDb)
    })
})