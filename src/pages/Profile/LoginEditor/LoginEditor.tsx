import { ChevronDown } from 'lucide-react'
import styles from './LoginEditor.module.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import useGetUser from '../../../hooks/user/useGetUser'

const LoginEditor = () => {
  const currentUser = useGetUser()

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(currentUser?.login || '')

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if(!isOpen)
      setInputValue(currentUser?.login || '')
  }, [isOpen])

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
        <button className={`btn ${styles.confirm_btn}`}>Изменить</button>
      </div>
    </div>
  )
}

export default LoginEditor