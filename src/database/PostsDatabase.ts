import { PostDB, PostWithCreatorDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public async insertPost(newPostDB: PostDB): Promise<void> {
        await BaseDatabase
          .connection(PostsDatabase.TABLE_POSTS)
          .insert(newPostDB)
    }

    public async getPostsWithCreator(query: string | undefined):Promise<PostWithCreatorDB[]>{

        if (query) {
        const postsDB:PostWithCreatorDB[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .where("content", "LIKE", `%${query}%`)
            .select(
                "posts.id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "posts.creator_id",
                "users.name AS creator_name"
            )
            .join("users", "posts.creator_id", "=", "users.id")

        return postsDB

        } else {
        const postsDB:PostWithCreatorDB[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "posts.creator_id",
                "users.name AS creator_name"
            )
            .join("users", "posts.creator_id", "=", "users.id")

        return postsDB
        
        }
    }

    public async getPostById (id: string): Promise<PostDB | undefined> {
        const userDB: PostDB[] = await BaseDatabase
          .connection(PostsDatabase.TABLE_POSTS)
          .where({id: id})

        return userDB[0]
    }

    public async editPostById (id: string, postDB: PostDB): Promise<void> {
        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .update(postDB)
        .where({id: id})
    }

    public async deleteUserById (id: string): Promise<void> {
        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .del().where({id: id})
    }
}