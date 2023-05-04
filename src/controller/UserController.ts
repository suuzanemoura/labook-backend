import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { GetUsersSchema } from "../dtos/User/getUsers.dto"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"

export class UserController{
    constructor(
        private userBusiness: UserBusiness
    ){}
    public getUsers = async (req:Request, res: Response) => {

        try {
            const input = GetUsersSchema.parse({
                query: req.query.query,
                token: req.headers.authorization
            })

            const output = await this.userBusiness.getUsers(input)
            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(500).send("Erro inesperado")
              }
        }
    }
}