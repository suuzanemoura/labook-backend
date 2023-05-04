import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public async getUsers(query: string | undefined): Promise<UserDB[]> {

        if (query) {
        const usersDB: UserDB[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .where("name", "LIKE", `%${query}%`)

        return usersDB
        } else {
        const usersDB: UserDB[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)

        return usersDB
        }

    }
}