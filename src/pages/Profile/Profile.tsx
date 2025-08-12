import { useParams } from 'react-router'
import useGetUser from '../../hooks/user/useGetUser'
import styles from './Profile.module.scss'
import useGetUserById from '../../hooks/user/useGetUserById'
import Loading from '../../components/UI/Loading/Loading'
import ErrorPage from '../ErrorPage/ErrorPage'
import UserPosts from './UserPosts/UserPosts'
import DivideLine from '../../components/UI/DivideLine/DivideLine'
import LogoutButton from './LogoutButton/LogoutButton'
import LoginEditor from './LoginEditor/LoginEditor'
import PasswordEditor from './PasswordEditor/PasswordEditor'
import ImageEditor from './ImageEditor/ImageEditor'

const Profile = () => {
  const { id } = useParams()
  const currentUser = useGetUser()
  const { isLoading, user, error } = useGetUserById(Number(id))

  return (
    <>
      {
        isLoading ? <Loading />
        : error ? <ErrorPage text={error.message} /> :
        !user ? <ErrorPage text='Пользователь не найден' /> :
        <div className={styles.container}>
          <div className={styles.user_image}>
            <img src={`/upload/${user.image}`} alt='avatar' />
          </div>
          <div className={styles.user_info}>
            <div className={styles.user_login}>
              Логин: <span className={styles.login}>{ user.login }</span>
            </div>
            <UserPosts id={user.id} />
            <DivideLine width='100%' />
            {
              currentUser?.id === user.id &&
              <div className={styles.user_settings}>
                <LoginEditor />
                <PasswordEditor />
                <ImageEditor />
                <LogoutButton />
              </div>
            }
          </div>
        </div>
      }
    </>
    
  )
}

export default Profile