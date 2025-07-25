import Loading from '../../components/UI/Loading/Loading'
import useCheckUserRole from '../../hooks/user/useCheckUserRole'
import useGetAllUsers from '../../hooks/user/useGetAllUsers'
import ErrorPage from '../ErrorPage/ErrorPage'
import UserItem from './UserItem/UserItem'
import styles from './UsersControl.module.scss'

const UsersControl = () => {
  const { isLoading, error, isAdmin } = useCheckUserRole()

  const usersData = useGetAllUsers()

  return (
    <>
      {
        isLoading ? <Loading /> : 
        error ? <ErrorPage text={error.message} /> :
        !isAdmin ? <ErrorPage text='Нет доступа' /> :
        <div className={styles.container}>
          {
            usersData.isLoading ? <Loading /> : 
            usersData.error ? <ErrorPage text={usersData.error.message} /> :
            usersData.users && usersData.users.map(user => <UserItem key={user.id} user={user} />)
          }
        </div>
      }
    </>
  )
}

export default UsersControl