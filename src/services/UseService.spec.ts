import { jest } from '@jest/globals'
import { UserService, type User } from "./UserService.js"

describe("UserService", () => {
    const mockDb: User[] = [
        {
            name: "Giulliano",
            email: "giulliano@teste.com"
        }
    ]

    const userService = new UserService(mockDb)
    const mockConsole = jest.spyOn(global.console, "log")

    it("Deve adicionar um novo usuário", () => {
        userService.createUser("Giulliano Create", "giulliano@create.com")
        expect(mockConsole).toHaveBeenCalledWith("DB atualizado:", mockDb)
    })

    it("Deve retornar um array contendo a lista de usuários", () => {
        const users = userService.getAllUsers()
        expect(users).toMatchObject(mockDb)
    })

    it("Deve deletar um usuário", () => {
        userService.deleteUser("giulliano@teste.com")
        expect(mockConsole).toHaveBeenCalledWith("DB atualizado:", userService.db)
    })
})