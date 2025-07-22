import { TUser } from "./user.types"

export type TPost = {
  id: number
  title: string
  tags: number[]
  text: string
  image?: string,
  imageSize: 'height' | 'width'
  authorId: number
  comments: Comment[]
  date: string
}

export type TCreatePost = Pick<TPost, 'title' | 'text'> & {
  image: FileList
  tags: number[]
}

export type TPostData = Pick<TPost, 'date' | 'authorId' | 'imageSize'> & TCreatePost

export type TPostsResponse = {
  postsOnPage: TSinglePost[]
  maxPostsCount: number
}

export type TPostsHomeParams = {
  page: number
  search: string
  tags: number[]
}

export type TUserPost = Pick<TPost, 'id' | 'title' | 'date'>

export type TSinglePost = TPost & {
  user: TUser
  tagsByName: string[]
}