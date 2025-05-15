export type Post = {
  id: number
  title: string
  tags: number[]
  text: string
  image?: string,
  imageSize?: string
  authorId: number
  comments: Comment[]
  date: string
}

export type Comment = {
  id: number
  authorId: number
  text: number
  date: string
}