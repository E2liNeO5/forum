import { Link } from 'react-router'
import Loading from '../../../components/UI/Loading/Loading'
import useGetUserPosts from '../../../hooks/user/useGetUserPosts'
import ErrorPage from '../../ErrorPage/ErrorPage'
import styles from './UserPosts.module.scss'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type Props = {
  id: number
}

const UserPosts = ({ id }: Props) => {
  const userPostsData = useGetUserPosts(id)

  const [isOpen, setIsOpen] = useState(false)

  const toggleHeight = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className={`${styles.user_posts_wrapper}${isOpen ? ` ${styles.open}` : ''}`}>
        {
          userPostsData.isLoading ? <Loading /> :
          userPostsData.error ? <ErrorPage text={userPostsData.error.message} /> :
          userPostsData.posts && userPostsData.posts.length > 0 ?
          <>
            <ChevronDown className={`${styles.toggle}${isOpen ? ` ${styles.open}` : ''}`} size={30} onClick={toggleHeight} />
            <div className={styles.user_posts}>
              {
                userPostsData.posts.map(post => {
                  return <Link
                      key={post.id}
                      to={`/post/${post.id}`}
                      className={styles.user_post_link}
                    >
                      { post.title } ({ post.date })
                    </Link>
                })
              }
            </div>
          </> :
          <ErrorPage text='Посты не найдены' />
        }
    </div>
  )
}

export default UserPosts