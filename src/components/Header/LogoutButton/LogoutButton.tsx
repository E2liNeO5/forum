import { useState } from 'react'
import styles from './LogoutButton.module.scss'
import useLogout from '../../../hooks/auth/useLogout'

const LogoutButton = () => {
  const [animate, setAnimate] = useState(false)

  const logout = useLogout()

  const showApproveMenu = () => setAnimate(prev => !prev)
  const onCancel = () => setAnimate(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.button} onClick={showApproveMenu}>
        <div className={styles.button_text}>Выйти</div>
      </div>
      <div className={`${styles.approve_menu}${animate ? ` ${styles.show_menu}` : ''}`}>
        <div className={styles.menu}>
          <div className={styles.question}>Вы уверены?</div>
          <button className={styles.menu_button} onClick={logout}>Да</button>
          <button className={styles.menu_button} onClick={onCancel}>Нет</button>
        </div>
      </div>
    </div>
  )
}

export default LogoutButton