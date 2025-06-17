export type Post = {
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


export type CreatePostType = Pick<Post, 'title' | 'text'> & {
  image: FileList
  tags: number[]
}

export type PostDataType = Pick<Post, 'date' | 'authorId' | 'imageSize'> & CreatePostType

export type Comment = {
  id: number
  authorId: number
  text: number
  date: string
}