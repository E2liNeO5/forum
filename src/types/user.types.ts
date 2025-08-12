export type TUser = {
  id: number
  login: string
  password: string
  role: string
  image: string
  banReason?: string
}

export type TUserImageData = {
  image: FileList
}

export type TAuthData = Pick<TUser, 'login' | 'password'>

export type TSignUpData = TAuthData & TUserImageData

export type TUserInitialState = {
  user: TUser | null
}

export type TUserRoleData = Pick<TUser, 'role' | 'banReason'>

export type TUserBanData = Required<Pick<TUser, 'id' | 'banReason'>>

export type TEditUserRole = Pick<TUser, 'id' | 'role'>

export type TPasswordChange = Pick<TUser, 'id'> & {
  currentPassword: string
  newPassword: string
  applyPassword: string
}

export type TEditLoginData = Pick<TUser, 'id' | 'login'>

export type TEditPasswordData = Pick<TUser, 'id' | 'password'>

export type TEditImageData = Pick<TUser, 'id'> & TUserImageData