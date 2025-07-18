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

export type TExtraClass = {
  label?: string
  input?: string
  block?: string
  form?: string
  wrapper?: string
  button?: string
}