import type { EntityManager } from "typeorm";
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock.ts";
import { User } from "../entities/User.ts";
import { UserRepository } from "./UserRepository.ts";

describe("UserRepository", () => {
    let userRepository: UserRepository;
    let managerMock: Partial<EntityManager>;

    const mockUser: User = {
        id: "12345",
        name: "Teste usuário",
        email: "teste@email.com",
        password: "password"
    }

    beforeAll(async () => {
        managerMock = await getMockEntityManager({
            saveReturn: mockUser
        });

        userRepository = new UserRepository(managerMock as EntityManager);
    })

    it("Deve cadastrar um novo usuário no banco de dados", async () => {
        const response = await userRepository.createUser(mockUser);
        expect(managerMock.save).toHaveBeenCalled();
        expect(response).toMatchObject(mockUser);
    })
})