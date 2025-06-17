export type CustomError = {
  data: {
    error: string
    message: string
  }
  status: number
}

export type TagsSelectItemType = {
  id: number
  name: string
}