import { jest } from '@jest/globals'
import { UserService } from "./UserService.js"
import { UserRepository } from '../repositories/UserRepository.ts'
import type { EntityManager } from 'typeorm'
import { getMockEntityManager } from '../__mocks__/mockEntityManager.mock.ts'
import type { User } from '../entities/User.ts'

jest.mock("../repositories/UserRepository.ts")

jest.mock("../database", () => {
    initialize: jest.fn()
})

describe("UserService", () => {
    let userService: UserService
    let mockUserRepository: UserRepository | jest.Mocked<UserRepository>
    let mockManager: Partial<EntityManager>

    const mockUser: Partial<User> = {
        name: "Teste usuário",
        email: "teste@email.com",
        password: "password"
    }

    const mockSavedUser: User = {
        id: "123456",
        name: "Teste usuário",
        email: "teste@email.com",
        password: "password"
    }

    beforeEach(async () => {
        mockManager = await getMockEntityManager({
            saveReturn: mockUser
        })

        mockUserRepository = new UserRepository(mockManager as EntityManager) as jest.Mocked<UserRepository>
        userService = new UserService(mockUserRepository)
    })

    it("Deve adicionar um novo usuário", async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockSavedUser)) as jest.Mock<any>

        const response = await userService.createUser("Teste usuário", "teste@email.com", "password")
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject(mockSavedUser)
    })

    // it("Deve retornar um array contendo a lista de usuários", () => {
    //     const users = userService.getAllUsers()
    //     expect(users).toMatchObject(mockDb)
    // })

    // it("Deve deletar um usuário", () => {
    //     userService.deleteUser("giulliano@teste.com")
    //     expect(mockConsole).toHaveBeenCalledWith("DB atualizado:", userService.db)
    // })
})