import { PostsDatabase } from "../database/PostsDatabase"
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/Post/createPost.dto"
import { DeletePostByIdInputDTO, DeletePostByIdOutputDTO } from "../dtos/Post/deletePostById.dto"
import { EditPostByIdInputDTO, EditPostByIdOutputDTO } from "../dtos/Post/editPostById.dto"
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/Post/getPosts.dto"
import { ForbiddenError } from "../errors/ForbiddenError"
import { NotFoundError } from "../errors/NotFoundError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { Post, PostDB, PostModel, PostWithCreatorDB } from "../models/Post"
import { TokenPayload, USER_ROLES } from "../models/User"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class PostBusiness {
    constructor (
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const { content, token } = input

        const payload: TokenPayload | null = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new UnauthorizedError()
        }

        const id = this.idGenerator.generate()

        const newPost = new Post (
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )

        const newPostDB:PostDB = newPost.toDBModel()
        await this.postsDatabase.insertPost(newPostDB)

        const output: CreatePostOutputDTO = {
            message: "Post criado com sucesso!"
          }
      
          return output
    }

    public getPosts = async (input: GetPostsInputDTO):Promise<GetPostsOutputDTO> => {

        const { query, token } = input

        const payload: TokenPayload | null = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new UnauthorizedError()
        }

        const postsDB:PostWithCreatorDB[] = await this.postsDatabase.getPostsWithCreator(query)
        
        const posts:PostModel[] = postsDB.map((postDB) => { 
            const post = new Post(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                postDB.creator_id,
                postDB.creator_name
            )
            return post.toBusinessModel()

        })

        if(!posts.length) throw new NotFoundError("Nenhum post foi cadastrado no banco de dados.")
    
        const output: GetPostsOutputDTO = posts
        return output
    }

    public editPostById = async (input: EditPostByIdInputDTO): Promise<EditPostByIdOutputDTO> => {
        const { idToEditPost, content, token } = input

        const payload: TokenPayload | null = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new UnauthorizedError()
        }

        const postDB: PostDB | undefined = await this.postsDatabase.getPostById(idToEditPost)
    
        if (!postDB) {
        throw new NotFoundError("Post não encontrado.")
        }

        if (payload.role !== USER_ROLES.ADMIN){
            if (payload.id !== postDB.creator_id) {
              throw new ForbiddenError("Somente o criador pode editar o post. Caso não tenha acesso a sua conta, entre em contato com nosso suporte.")
            }
        }
    
        const post = new Post(
        postDB.id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at,
        payload.id,
        payload.name
        )

        post.CONTENT = content
        post.UPDATED_AT = new Date().toISOString()

        const updatedPostDB:PostDB = post.toDBModel()
        await this.postsDatabase.editPostById(postDB.id, updatedPostDB)
    
        const output = {
        message: "Post atualizado com sucesso!",
        }

        return output
    }
    
    public deletePostById = async (input: DeletePostByIdInputDTO): Promise<DeletePostByIdOutputDTO> => {
        const { idToDelete, token } = input

        const payload: TokenPayload | null = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new UnauthorizedError()
        }

        const postDB: PostDB | undefined = await this.postsDatabase.getPostById(idToDelete)
        
        if (!postDB) {
        throw new NotFoundError("Post não encontrado.")
        }

        if (payload.role !== USER_ROLES.ADMIN){
            if (payload.id !== postDB.creator_id) {
              throw new ForbiddenError("Somente o criador pode excluir o post. Caso não tenha acesso a sua conta, entre em contato com nosso suporte.")
            }
        }
        
        await this.postsDatabase.deleteUserById(idToDelete)
    
        const output = {
        message: "Post excluído com sucesso!",
        }
        return output
    }
}