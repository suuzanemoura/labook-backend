export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    upload_at: string
}

export interface Creator {
    id: string,
    name: string
}

export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    uploadAt: string,
    creator: Creator
  }

export class Post {
    constructor(
      private id: string,
      private content: string,
      private likes: number,
      private dislikes: number,
      private createdAt: string,
      private uploadAt: string,
      private creatorId: string,
      private creatorName: string,
    ) {}

    public get ID(): string {
        return this.id;
    }

    public get CONTENT(): string {
        return this.content;
    }

    public get LIKES(): number {
        return this.likes;
    }

    public get DISLIKES(): number {
        return this.dislikes;
    }

    public get CREATED_AT(): string {
        return this.createdAt
    }

    public get UPLOAD_AT(): string {
        return this.uploadAt
    }

    public get CREATOR_ID(): string {
        return this.creatorId;
    }

    public get CREATOR_NAME(): string {
        return this.creatorName;
    }

    public set CONTENT(newContent: string) {
        this.content = newContent;
    }

    public set LIKES(newLikes: number) {
        this.likes = newLikes;
    }

    public set DISLIKES(newDislikes: number) {
        this.dislikes = newDislikes;
    }

    public set UPLOAD_AT(newUploadAt: string) {
        this.uploadAt = newUploadAt;
    }

    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            upload_at: this.uploadAt
        }
    }
  
    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            uploadAt: this.uploadAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        }
    }
}