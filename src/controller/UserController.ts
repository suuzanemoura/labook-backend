import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { GetUsersSchema } from "../dtos/User/getUsers.dto"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { SignupSchema } from "../dtos/User/signup.dto"
import { LoginSchema } from "../dtos/User/login.dto"
import { DeleteUserByIdSchema } from "../dtos/User/deleteUserById.dto"
import { EditUserByIdSchema } from "../dtos/User/editUserById.dto"

export class UserController{
    constructor(
        private userBusiness: UserBusiness
    ){}

    public signup = async (req: Request, res: Response) => {
        try {
          const input = SignupSchema.parse({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          })
    
          const output = await this.userBusiness.signup(input)
          res.status(201).send(output)

        } catch (error) {
          console.log(error)
    
          if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else {
            res.status(500).send("Erro inesperado.")
          }
        }
    }

    public login = async (req: Request, res: Response) => {
      try {
        const input = LoginSchema.parse({
          email: req.body.email,
          password: req.body.password
        })
  
        const output = await this.userBusiness.login(input)
        res.status(200).send(output)

      } catch (error) {
        console.log(error)
  
        if (error instanceof ZodError) {
          res.status(400).send(error.issues)
        } else if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).send("Erro inesperado.")
        }
      }
    }

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
                res.status(500).send("Erro inesperado.")
              }
        }
    }

    public editUserById = async (req: Request, res: Response) => {
      try {
        const input = EditUserByIdSchema.parse({
          idToEditUser: req.params.id,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          token: req.headers.authorization
        })
  
        const output = await this.userBusiness.editUserById(input)
        res.status(200).send(output)

      } catch (error) {
        console.log(error)
  
        if (error instanceof ZodError) {
          res.status(400).send(error.issues)
        } else if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).send("Erro inesperado.")
        }
      }
    }
    
    public deleteUserById = async (req: Request, res: Response) => {
      try {
        const input = DeleteUserByIdSchema.parse({
          idToDelete: req.params.id,
          token: req.headers.authorization
        })
  
        const output = await this.userBusiness.deleteUserById(input)
        res.status(200).send(output)

      } catch (error) {
        console.log(error)
  
        if (error instanceof ZodError) {
          res.status(400).send(error.issues)
        } else if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).send("Erro inesperado.")
        }
      }
    }
}