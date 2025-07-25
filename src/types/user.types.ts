export type TUser = {
  id: number
  login: string
  password: string
  role: string
  image: string
  banReason?: string
}

export type TAuthData = Pick<TUser, 'login' | 'password'>

export type TSignUpData = TAuthData & {
  image: FileList
}

export type TUserInitialState = {
  user: TUser | null
}

export type TUserRoleData = Pick<TUser, 'role' | 'banReason'>

export type TUserBanData = Required<Pick<TUser, 'id' | 'banReason'>>

export type TEditUserRole = Pick<TUser, 'id' | 'role'>