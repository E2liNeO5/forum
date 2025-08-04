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

export type TCommentItem = TComment & {
  user: TUser
}

export type TPostComment = {
  commentsOnPage: TCommentItem[]
  maxComments: number
}

export type TCommentOnPostData = {
  postId: number
  page: number
}

export type TCommentExistData = Pick<TComment, 'id'> & {
  postId: number
}