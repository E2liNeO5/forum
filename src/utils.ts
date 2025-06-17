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