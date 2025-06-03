export type Toast = {
  id: number
  text: string
  type?: 'success' | 'error'
}

export type ToastInitialState = {
  toasts: Toast[]
}