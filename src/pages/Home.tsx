import { useEffect, useMemo, useState } from "react"
import styles from '../components/Post/PostItem.module.scss'
import PostSmall from "../components/Post/PostSmall"
import useGetPosts from "../hooks/posts/useGetPosts"
import PostLeft from "../components/Post/PostLeft"
import PostRight from "../components/Post/PostRight"
import TagSidebar from "../components/TagSidebar/TagSidebar"
import ErrorPage from "./ErrorPage/ErrorPage"
import Loading from "../components/UI/Loading/Loading"
import { Post } from "../types/post"

function Home() {
  const [page, setPage] = useState(1)
  const [loadedPosts, setLoadedPosts] = useState<Post[]>([])

  const { isLoading, error, posts } = useGetPosts(page)

  const memorizedPosts = useMemo(() => {
    let count = 0
    return loadedPosts?.map(item => {
      count++
      if(count === 5)
        count = 1

      if(count === 1)
        return <PostLeft key={item.id} item={item} />
      else if(count === 4) {
        return <PostRight key={item.id} item={item} />
      } else {
        return <PostSmall key={item.id} item={item} />
      }
    })
  }, [loadedPosts])

  useEffect(() => {
    if(posts && posts.length > 0) 
      setLoadedPosts(prev => ([...prev, ...posts]))
  }, [posts])

  return (
    <>
      <TagSidebar />
      {
        isLoading ? <Loading /> :
        error ? <ErrorPage text={error.message} /> : 
        memorizedPosts && memorizedPosts.length > 0 ? 
          <>
            <div className={styles.posts_container}>
              { memorizedPosts }
            </div>
            <div className="loading_posts" onClick={() => setPage(prev => prev + 1)}>Показать ещё</div>
          </>
        : <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
      }
    </>
  )
}

export default Home
