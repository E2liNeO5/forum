import { useState } from 'react'
import useLogout from '../../../hooks/auth/useLogout'
import styles from './LogoutButton.module.scss'
import Modal from '../../../components/UI/Modal/Modal'
import ConfirmDialog from '../../../components/UI/Modal/ConfirmDialog/ConfirmDialog'

const LogoutButton = () => {
  const logout = useLogout()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className="btn" onClick={() => setIsOpen(true)}>Выйти</button>
      { isOpen && <Modal title='Выйти из аккаунта?' onClose={() => setIsOpen(false)}>
        <ConfirmDialog yesHandler={logout} noHandler={() => setIsOpen(false)} />
      </Modal> }
    </>
  )
}

export default LogoutButton