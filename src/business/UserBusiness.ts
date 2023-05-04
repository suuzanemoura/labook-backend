import { UsersDatabase } from "../database/UsersDatabase"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/User/getUsers.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { TokenPayload, USER_ROLES, User, UserDB, UserModel } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class UserBusiness {
    constructor (
      private usersDatabase: UsersDatabase,
      private idGenerator: IdGenerator,
      private tokenManager: TokenManager,
      private hashManager: HashManager
    ) {}

    public getUsers = async (input: GetUsersInputDTO):Promise<GetUsersOutputDTO> => {

      const { query, token } = input

      const payload: TokenPayload | null = this.tokenManager.getPayload(token)

      if(payload === null) {
        throw new BadRequestError("É necessário o preenchimento de token para acessar o recurso.")
      }

      if (payload.role !== USER_ROLES.ADMIN) {
        throw new BadRequestError("Somente ADMINS podem acessar esse recurso.")
      }

      const usersDB: UserDB[] = await this.usersDatabase.getUsers(query)
    
      const users:UserModel[] = usersDB.map((userDB) => { 
          const user = new User(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.role,
          userDB.created_at,    
      )
      return user.toBusinessModel()
      })

      if(!users.length) throw new NotFoundError("Nenhum usuário cadastrado no banco de dados.")
  
      const output: GetUsersOutputDTO = users
      return output
    }
    
}