import express from 'express'
import { PostsDatabase } from '../database/PostsDatabase'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { HashManager } from '../services/HashManager'

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostsDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

postRouter.get("/", postController.getPosts)