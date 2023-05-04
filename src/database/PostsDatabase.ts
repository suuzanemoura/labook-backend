import { BaseDatabase } from "./BaseDatabase";
import { UsersDatabase } from "./UsersDatabase";

export class PostsDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public async getPosts(query: string | undefined){

        const usersDB = await BaseDatabase.connection(UsersDatabase.TABLE_USERS) 

        if (query) {
        const postsDB = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .where("content", "LIKE", `%${query}%`)

        return { postsDB, usersDB }

        } else {
        const postsDB = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)

        return { postsDB, usersDB }
        
        }
    }
}