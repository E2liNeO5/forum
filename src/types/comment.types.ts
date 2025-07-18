import { TUser } from "./user.types"

export type TComment = {
  id: number
  authorId: number
  text: string
  date: string
}

export type TCommentData = Pick<TComment, 'text' | 'date' | 'authorId'> & {
  postId: number
}

export type TPostComment = TComment & {
  user: TUser
}