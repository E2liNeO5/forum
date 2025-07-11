import { Link, NavLink, useParams } from 'react-router'
import styles from './Header.module.scss'
import useGetUser from '../../hooks/user/useGetUser'
import useGetUserLinks from '../../hooks/user/useGetUserLinks'
import { useCallback } from 'react'
import { SquareUser } from 'lucide-react'

const Header = () => {
  const user = useGetUser()
  const links = useGetUserLinks()

  const { id } = useParams()

  const showLinks = useCallback(() => {
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
      <Link to='/' className="logo"><img src="/images/logo.png" alt="logo" height={50} /></Link>
      <nav className={styles.nav}>
        <NavLink to='/' className={ ({isActive}) => `${styles.nav_link} ${isActive ? styles.active : ''}` }>Главная</NavLink>
        { showLinks() }
        { user ?
            <NavLink
              to={`/profile/${user.id}`}
              className={ ({isActive}) => `${styles.nav_link} ${styles.profile} ${isActive && id && +id === user.id ? styles.active : ''}` }
            ><SquareUser size={30} /></NavLink> :
            <NavLink
              to='/signIn'
              className={ ({isActive}) => `${styles.nav_link} ${isActive ? styles.active : ''}` }
            >Войти</NavLink> }
      </nav>
    </div>
  )
}

export default Header