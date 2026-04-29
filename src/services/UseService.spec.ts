import { jest } from '@jest/globals'
import { UserService, type User } from "./UserService.js"

describe("UserService", () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb)

    it("Deve adicionar um novo usuário", () => {
        const mockConsole = jest.spyOn(global.console, "log")
        userService.createUser("Giulliano", "giulliano@teste.com")

        expect(mockConsole).toHaveBeenCalledWith("DB atualizado:", mockDb)
    })

    it("Deve retornar um array contendo a lista de usuários", () => {
        const users = userService.getAllUsers()
        expect(users).toMatchObject(mockDb)
    })
})