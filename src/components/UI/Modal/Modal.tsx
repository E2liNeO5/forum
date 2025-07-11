import { createPortal } from 'react-dom'
import styles from './Modal.module.scss'
import { PropsWithChildren } from 'react'

type Props = {
  title: string
  onClose: () => void
}

const Modal = ({ children, title, onClose }: Props & PropsWithChildren) => {
  return createPortal(
    <div className={styles.wrapper} onClick={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{ title }</h2>
        { children }
      </div>
    </div>,
    document.body)
}

export default Modal