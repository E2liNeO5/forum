import { useState } from 'react'
import useLogout from '../../../hooks/auth/useLogout'
import styles from './LogoutButton.module.scss'
import Modal from '../../../components/UI/Modal/Modal'

const LogoutButton = () => {
  const logout = useLogout()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className="btn" onClick={() => setIsOpen(true)}>Выйти</button>
      { isOpen && <Modal title='Выйти из аккаунта?' onClose={() => setIsOpen(false)}>
        <div className={styles.container}>
          <button className={`btn ${styles.answer_btn}`} onClick={logout}>Да</button>
          <button className={`btn ${styles.answer_btn}`} onClick={() => setIsOpen(false)}>Нет</button>
        </div>
      </Modal> }
    </>
  )
}

export default LogoutButton