import { ChevronDown } from 'lucide-react'
import styles from './LoginEditor.module.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import useGetUser from '../../../hooks/user/useGetUser'
import Modal from '../../../components/UI/Modal/Modal'
import ConfirmDialog from '../../../components/UI/Modal/ConfirmDialog/ConfirmDialog'
import useEditUserLogin from '../../../hooks/user/useEditUserLogin'

const LoginEditor = () => {
  const currentUser = useGetUser()

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(currentUser?.login || '')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const editUserLogin = useEditUserLogin()

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if(!isOpen)
      setInputValue(currentUser?.login || '')
  }, [isOpen])

  const openModal = () => {
    if(currentUser?.login !== inputValue)
      setModalIsOpen(true)
  }

  const confirmEditLogin = () => {
    editUserLogin({
      id: Number(currentUser?.id),
      login: inputValue
    })
    setModalIsOpen(false)
    setIsOpen(false)
  }

  return (
    <div className={`${styles.wrapper}${isOpen ? ' ' + styles.open : ''}`}>
      <h2 className={styles.title}>Изменить логин <ChevronDown className={styles.toggle} onClick={() => setIsOpen(prev => !prev)} /></h2>
      <div className={styles.container}>
        <div>
          Текущий логин:
          <input
            type="text"
            className={styles.login_input}
            value={inputValue}
            onChange={changeHandler}
          />
        </div>
        <button className={`btn ${styles.confirm_btn}`} onClick={openModal}>Изменить</button>
      </div>
      { modalIsOpen && <Modal title={`Изменить логин на "${inputValue}"?`} onClose={() => setModalIsOpen(false)}>
        <ConfirmDialog
          yesHandler={confirmEditLogin}
          noHandler={() => setModalIsOpen(false)}
        />
      </Modal> }
    </div>
  )
}

export default LoginEditor