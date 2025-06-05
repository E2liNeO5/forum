import { NavLink } from 'react-router'
import styles from './Header.module.scss'
import { HEADER_LINKS } from '../../constants'
import useGetUser from '../../hooks/user/useGetUser'
import LogoutButton from './LogoutButton/LogoutButton'
import useGetAdminLinks from '../../hooks/user/useGetAdminLinks'
import { useCallback } from 'react'

const Header = () => {
  const user = useGetUser()

  const adminLinks = useGetAdminLinks()

  const showLinks = useCallback(() => {
    const links = [...HEADER_LINKS, ...adminLinks]
    return links.map(link =>
      <NavLink
        key={link.title}
        to={link.to}
        className={ ({isActive}) => `${styles.nav_link} ${isActive ? styles.active : ''}` }>
          {link.title}
      </NavLink>)
  }, [user && user.id])

  return (
    <div className={styles.header}>
      <div className="logo"><img src="/images/logo.png" alt="logo" height={50} /></div>
      <nav className={styles.nav}>
        { showLinks() }
        { user ?
            <LogoutButton /> :
            <NavLink to='/signIn' className={ ({isActive}) => `${styles.nav_link} ${isActive ? styles.active : ''}` }>Войти</NavLink> }
      </nav>
    </div>
  )
}

export default Header