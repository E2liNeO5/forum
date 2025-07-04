import { SAFE_HTML_TAGS } from "./constants"
import { textStyleType } from "./hooks/textarea/useGetSelection"

export const localStorageSet = (key: string, data: any) => {
  localStorage.setItem(key, typeof data === 'object' ? JSON.stringify(data) : data)
}

export const localStorageGet = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : data
}

export const getCurrentDate = () => {
  const now = new Date()
  return `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
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

export const getTextStyle = (text: string, style: textStyleType) => style ? `<${style}>${text}</${style}>` : text