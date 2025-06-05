export type User = {
  id: number
  login: string
  password: string
  posts: number[]
  role: string
}

export type AuthData = Pick<User, 'login' | 'password'>

export type UserInitialState = {
  user: User | null
}