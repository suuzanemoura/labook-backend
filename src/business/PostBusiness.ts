import { PostsDatabase } from "../database/PostsDatabase"
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/Post/getPosts.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post, PostModel } from "../models/Post"
import { TokenPayload } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class PostBusiness {
    constructor (
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public getPosts = async (input: GetPostsInputDTO):Promise<GetPostsOutputDTO> => {

        const { query, token } = input

        const payload: TokenPayload | null = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError("É necessário o preenchimento de token para acessar o recurso.")
        }

        const postsDB = await this.postsDatabase.getPostsWithCreator(query)
        
        const posts:PostModel[] = postsDB.map((postDB) => { 
            const post = new Post(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.upload_at,
                postDB.creator_id,
                postDB.creator_name
            )
            return post.toBusinessModel()

        })

        if(!posts.length) throw new NotFoundError("Nenhum post foi cadastrado no banco de dados.")
    
        const output: GetPostsOutputDTO = posts
        return output
      }
    
}