import { SAFE_HTML_TAGS } from "./constants"
import { TPost } from "./types/post.types"

export const localStorageSet = (key: string, data: any) => {
  localStorage.setItem(key, typeof data === 'object' ? JSON.stringify(data) : data)
}

export const localStorageGet = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : data
}

const getNormalDateValue = (value: number) => String(value).length === 1 ? `0${value}` : value

export const getCurrentDate = () => {
  const now = new Date()
  const date = [
    `${getNormalDateValue(now.getDate())}`,
    `${getNormalDateValue(now.getMonth() + 1)}`,
    `${now.getFullYear()}`
  ].join('.')
  const time = [
    `${getNormalDateValue(now.getHours())}`,
    `${getNormalDateValue(now.getMinutes())}`,
    `${getNormalDateValue(now.getSeconds())}`
  ].join(':')

  return `${date} ${time}`
}

export const parseToSafeHtml = (html: string) => {
  let safeHtml = html
  const tags = html.match(/<[^>]+>/g)
  tags?.forEach(tag => {
    if(!SAFE_HTML_TAGS.includes(tag))
      safeHtml = safeHtml.replace(tag, '')
  })
  return safeHtml
}

export const getPostSearchCondition = (post: TPost, search: string) => {
  return post.title.toLowerCase().indexOf(search) >= 0 || post.text.toLowerCase().indexOf(search) >= 0
}