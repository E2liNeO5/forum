export type TCustomError = {
  data: {
    error: string
    message: string
  }
  status: number
}

export type TTagsSelectItem = {
  id: number
  name: string
}