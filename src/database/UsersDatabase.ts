import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public async getUsers(q: string | undefined) {

        if (q) {
        const usersDB = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .where("name", "LIKE", `%${q}%`)

        return usersDB
        } else {
        const usersDB = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)

        return usersDB
        }

    }
}