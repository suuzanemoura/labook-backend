import { Post, PostWithCreatorDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public async getPostsWithCreator(query: string | undefined){

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
        const postsDB = await BaseDatabase
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
}