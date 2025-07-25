export const BASE_URL = 'http://localhost:3000'

export const TOAST_REMOVE_TIME = 4000

export const USER_KEY = 'user'

export const USER_LINKS = [
  {
    to: 'create_post',
    title: 'Написать'
  }
]

export const ADMIN_LINKS = [
  {
    to: 'create_tag',
    title: 'Тэги'
  },
  {
    to: 'users_control',
    title: 'Пользователи'
  }
]

export const POSTS_PER_PAGE = 8

export const COMMENTS_PER_PAGE = 8

export const SAFE_HTML_TAGS = ['<b>', '<u>', '<i>', '</b>', '</u>', '</i>']

export const USER_ROLES = [
  { value: 'admin', title: 'Администратор' },
  { value: 'user', title: 'Пользователь' },
  { value: 'banned', title: 'Забаненный' },
]