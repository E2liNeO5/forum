export type TUser = {
  id: number
  login: string
  password: string
  posts: number[]
  role: string
}

export type TAuthData = Pick<TUser, 'login' | 'password'>

export type TUserInitialState = {
  user: TUser | null
}