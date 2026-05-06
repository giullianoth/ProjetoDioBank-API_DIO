import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from "crypto";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @Column({ type: "varchar", nullable: false })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    constructor(name: string, email: string, password: string) {
        this.id = randomUUID();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}