import { TUser } from "./user.types"

export type TReport = {
  id: number
  url: string
  text: string
  userId: number
}

export type TReportItem = TReport & {
  user: TUser
}