export type TToast = {
  id: number
  text: string
  type?: 'success' | 'error'
}

export type TToastInitialState = {
  toasts: TToast[]
}

export type TToastData = Omit<TToast, 'id'>