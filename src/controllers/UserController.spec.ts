import { jest } from "@jest/globals"
import { UserController } from "./UserController.ts"
import type { UserService } from "../services/UserService.ts"
import { makeMockResponse } from "../__mocks__/mockResponse.mock.ts"
import type { Request } from "express"

// const mockUserService = {
//     createUser: jest.fn()
// }

// jest.mock("../services/UserService.js", () => {
//     return {
//         UserService: jest.fn().mockImplementation(() => mockUserService)
//     }
// })

describe("UserController", () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn() as jest.Mock<any>
    }

    const userController = new UserController(mockUserService as UserService)
    const mockResponse = makeMockResponse()

    it("Deve adicionar um novo usuário", async () => {
        const mockRequest = {
            body: {
                name: "Giulliano",
                email: "giulliano@teste.com",
                password: "123456"
            }
        } as Request

        const response = await userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: "Usuário criado" })
    })

    it("Deve retornar um erro caso o nome não seja fornecido", async () => {
        const mockRequest = {
            body: {
                email: "giulliano@teste.com",
                password: "123456"
            }
        } as Request

        const response = await userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({
            message: "Bad request: nome é obrigatório"
        })
    })

    it("Deve retornar um erro caso o campo nome esteja vazio", async () => {
        const mockRequest = {
            body: {
                name: "",
                email: "giulliano@teste.com",
                password: "123456"
            }
        } as Request

        const response = await userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({
            message: "Bad request: nome é obrigatório"
        })
    })

    it("Deve retornar um erro caso o e-mail não seja fornecido", async () => {
        const mockRequest = {
            body: {
                name: "Giulliano",
                password: "123456"
            }
        } as Request

        const response = await userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({
            message: "Bad request: e-mail é obrigatório"
        })
    })

    it("Deve retornar um erro caso o campo e-mail esteja vazio", async () => {
        const mockRequest = {
            body: {
                name: "Giulliano",
                email: "",
                password: "123456"
            }
        } as Request

        const response = await userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({
            message: "Bad request: e-mail é obrigatório"
        })
    })

    it("Deve retornar um erro caso o senha não seja fornecido", async () => {
        const mockRequest = {
            body: {
                name: "Giulliano",
                email: "giulliano@teste.com",
            }
        } as Request

        const response = await userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({
            message: "Bad request: senha é obrigatória"
        })
    })

    it("Deve retornar um erro caso o campo senha esteja vazio", async () => {
        const mockRequest = {
            body: {
                name: "Giulliano",
                email: "giulliano@teste.com",
                password: ""
            }
        } as Request

        const response = await userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({
            message: "Bad request: senha é obrigatória"
        })
    })

    // it("Deve retornar um array contendo a lista de usuários", () => {
    //     const response = userController.getAllUsers({} as Request, mockResponse)

    //     expect(mockResponse.state.status).toBe(200)
    //     expect(mockResponse.state.json).toMatchObject(mockDb)
    // })

    // it("Deve deletar um usuário", () => {
    //     const mockRequest = {
    //         body: {
    //             name: "Giulliano",
    //             email: "giulliano@teste.com"
    //         }
    //     } as Request

    //     const response = userController.deleteUser(mockRequest, mockResponse)

    //     expect(mockResponse.state.status).toBe(200)
    //     expect(mockResponse.state.json).toMatchObject({
    //         message: "Usuário deletado"
    //     })
    // })

    // it("Deve retornar um erro quando o usuário não for encontrado", () => {
    //     const mockRequest = {
    //         body: {
    //             name: "Giulliano",
    //             email: "giulliano@teste2.com"
    //         }
    //     } as Request

    //     const response = userController.deleteUser(mockRequest, mockResponse)

    //     expect(mockResponse.state.status).toBe(404)
    //     expect(mockResponse.state.json).toMatchObject({
    //         message: "Usuário não encontrado"
    //     })
    // })
})