import { AppDataSource } from "../database/index.ts";
import { User } from "../entities/User.ts";
import { UserRepository } from "../repositories/UserRepository.ts"

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository = new UserRepository(AppDataSource.manager)) {
        this.userRepository = userRepository
    }

    createUser = async (name: string, email: string, password: string): Promise<User> => {
        const user = new User(name, email, password);
        return this.userRepository.createUser(user);
    }

    getUser = () => {

    }

    // deleteUser = (email: string) => {
    //     const stripped = this.db.filter(data => data.email !== email)
    //     this.db = stripped
    //     console.log("DB atualizado:", this.db)
    // }
}