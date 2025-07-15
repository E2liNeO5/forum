import { createPortal } from 'react-dom'
import styles from './Modal.module.scss'
import { PropsWithChildren, useEffect } from 'react'

type Props = {
  title?: string
  onClose: () => void
}

const Modal = ({ children, title, onClose }: Props & PropsWithChildren) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'initial' }
  }, [])

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.container}>
        <div className={styles.close_btn} onClick={onClose}>X</div>
        { title && <h2 className={styles.title}>{ title }</h2> }
        { children }
      </div>
    </div>,
    document.body)
}

export default Modal