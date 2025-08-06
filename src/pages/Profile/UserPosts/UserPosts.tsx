import { Link } from 'react-router'
import Loading from '../../../components/UI/Loading/Loading'
import useGetUserPosts from '../../../hooks/user/useGetUserPosts'
import ErrorPage from '../../ErrorPage/ErrorPage'
import styles from './UserPosts.module.scss'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TUserPost } from '../../../types/post.types'
import SearchItems from '../../../components/UI/SearchItems/SearchItems'

type Props = {
  id: number
}

const UserPosts = ({ id }: Props) => {
  const [search, setSearch] = useState('')
  const [userPosts, setUserPosts] = useState<TUserPost[]>([])

  const { isLoading, error, posts } = useGetUserPosts(id)

  const [isOpen, setIsOpen] = useState(false)

  const toggleHeight = () => {
    setIsOpen(prev => !prev)
  }

  useEffect(() => {
    if(posts)
      setUserPosts(posts.filter(post => post.title.toLowerCase().indexOf(search) >= 0))
  }, [posts, search])

  return (
    <div className={`${styles.user_posts_wrapper}${isOpen ? ` ${styles.open}` : ''}`}>
        {
          isLoading ? <Loading /> :
          error ? <ErrorPage text={error.message} /> :
          userPosts.length > 0 ?
          <>
            <ChevronDown className={`${styles.toggle}${isOpen ? ` ${styles.open}` : ''}`} size={30} onClick={toggleHeight} />
            <div className={styles.user_posts}>
              <SearchItems setSearch={setSearch} classes={{ wrapper: styles.search }} />
              {
                userPosts.map(post => {
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
          <h3 className='data_is_not_found'>Посты не найдены</h3>
        }
    </div>
  )
}

export default UserPosts