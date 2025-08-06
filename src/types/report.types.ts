import { TUser } from "./user.types"

export type TReport = {
  id: number
  url: string
  text: string
  userId: number
  date: string
}

export type TReportItem = TReport & {
  user: TUser
}

export type TReportData = Pick<TReport, 'text' | 'url' | 'userId' | 'date'>