import { Table, type MigrationInterface, type QueryRunner } from "typeorm";

export class User1777922290376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "string",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "string",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "string",
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "string",
                        isNullable: false,
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
