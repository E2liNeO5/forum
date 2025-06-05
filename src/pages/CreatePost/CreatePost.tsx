import useGetUser from '../../hooks/user/useGetUser'
import ErrorPage from '../ErrorPage/ErrorPage'
import styles from './CreatePost.module.scss'

const CreatePost = () => {
  const user = useGetUser()

  return (
    <>
      {
        user ?
        (
          <>123</>
        ) :
        (
          <ErrorPage text='Нужно войти в аккаунт' />
        )
      }
    </>
  )
}

export default CreatePost