export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Clóvis",
        email: "clovis@miau.com",
    }
]

export class UserService {
    db: User[]

    constructor(database = db) {
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = { name, email }
        this.db.push(user)
        console.log("DB atualizado:", this.db)
    }

    getAllUsers = () => {
        return this.db
    }
}