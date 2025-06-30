import styles from './Toast.module.scss'
import { TToast } from "../../../types/toast"
import { useEffect, useState } from 'react'
import { TOAST_REMOVE_TIME } from '../../../constants'
import useActions from '../../../hooks/useActions'
import useAnimation from '../../../hooks/useAnimation'

type Props = {
  toast: TToast
}

const Toast = ({ toast }: Props) => {
  const { removeToast } = useActions()
  
  const [animation, setAnimation] = useState('')

  const animate = useAnimation()

  useEffect(() => {
    setTimeout(() => {
      animate({
        value: styles.fadeOut,
        defaultValue: '',
        setter: setAnimation,
        duration: 500,
        ending: () => removeToast({ id:toast.id })
      })
    }, TOAST_REMOVE_TIME - 500)
  }, [])

  return (
    <div className={`${styles.toast_item}${toast.type ? ' ' + styles[toast.type] : ''} ${animation}`}>
      { toast.text }
    </div>
  )
}

export default Toast