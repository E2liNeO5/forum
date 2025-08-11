import { useEffect, useState } from 'react'
import Loading from '../../components/UI/Loading/Loading'
import SearchItems from '../../components/UI/SearchItems/SearchItems'
import useCheckUserRole from '../../hooks/user/useCheckUserRole'
import useGetAllUsers from '../../hooks/user/useGetAllUsers'
import ErrorPage from '../ErrorPage/ErrorPage'
import UserItem from './UserItem/UserItem'
import styles from './UsersControl.module.scss'
import { TUser } from '../../types/user.types'

const UsersControl = () => {
  const [search, setSearch] = useState('')
  const [userItems, setUserItems] = useState<TUser[]>([])

  const { isLoading, error, isAdmin } = useCheckUserRole()

  const usersData = useGetAllUsers()

  useEffect(() => {
    if(usersData.users)
      setUserItems(usersData.users.filter(user => user.login.toLowerCase().indexOf(search) >= 0 || String(user.id).toLowerCase().indexOf(search) >= 0))
  }, [usersData.users, search])

  return (
    <>
      {
        isLoading ? <Loading /> : 
        error ? <ErrorPage text={error.message} /> :
        !isAdmin ? <ErrorPage text='Нет доступа' /> :
        <>
        <SearchItems setSearch={setSearch} classes={{ wrapper: styles.search }} />
          <div className={styles.container}>
            {
              usersData.isLoading ? <Loading /> : 
              usersData.error ? <ErrorPage text={usersData.error.message} /> :
              userItems.map(user => <UserItem key={user.id} user={user} />)
            }
          </div>
        </>
      }
    </>
  )
}

export default UsersControl