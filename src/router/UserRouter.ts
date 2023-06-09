import express from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { UsersDatabase } from '../database/UsersDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { HashManager } from '../services/HashManager'
import { PostsDatabase } from '../database/PostsDatabase'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UsersDatabase(),
        new PostsDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.get("/", userController.getUsers)
userRouter.put("/:id", userController.editUserById)
userRouter.delete("/:id", userController.deleteUserById)