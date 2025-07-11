export type TUser = {
  id: number
  login: string
  password: string
  role: string
  image: string
}

export type TAuthData = Pick<TUser, 'login' | 'password'>
export type TSignUpData = TAuthData & {
  image: FileList
}

export type TUserInitialState = {
  user: TUser | null
}