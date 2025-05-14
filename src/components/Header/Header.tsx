import { NavLink } from 'react-router'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="logo"><img src="/images/logo.png" alt="logo" height={50} /></div>
      <nav className={styles.nav}>
        <NavLink to='/' className={ ({isActive}) => `${styles.nav_link} ${isActive ? styles.active : ''}` }>Главная</NavLink>
        <NavLink to='/fag' className={ ({isActive})=> `${styles.nav_link} ${isActive ? styles.active : ''}` }>Меню1</NavLink>
        <NavLink to='/t' className={ ({isActive}) => `${styles.nav_link} ${isActive ? styles.active : ''}` }>Меню2</NavLink>
        <NavLink to='/login' className={ ({isActive}) => `${styles.nav_link} ${isActive ? styles.active : ''}` }>Войти</NavLink>
      </nav>
    </div>
  )
}

export default Header