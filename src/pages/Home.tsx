import { useEffect, useMemo, useState } from "react"
import styles from '../components/Post/Post.module.scss'
import PostSmall from "../components/Post/PostSmall"
import useGetPosts from "../hooks/posts/useGetPosts"
import TagSidebar from "../components/TagSidebar/TagSidebar"
import ErrorPage from "./ErrorPage/ErrorPage"
import Loading from "../components/UI/Loading/Loading"
import { TSinglePost } from "../types/post.types"
import { getPostSearchCondition } from "../utils"
import useGetCurrentTags from "../hooks/tags/useGetCurrentTags"
import Post from "../components/Post/Post"
import SearchItems from "../components/UI/SearchItems/SearchItems"

function Home() {
  const [page, setPage] = useState(1)
  const [loadedPosts, setLoadedPosts] = useState<TSinglePost[]>([])
  const [search, setSearch] = useState('')

  const { isLoading, error, posts, maxPostsCount } = useGetPosts(page, search)
  const currentTags = useGetCurrentTags()

  const memorizedPosts = useMemo(() => {
    let count = 0
    return loadedPosts.sort((a, b) => b.id - a.id).map(item => {
      count++
      if(count === 5)
        count = 1

      if(count === 1)
        return <Post key={item.id} item={item} side='left' />
      else if(count === 4) {
        return <Post key={item.id} item={item} side='right' />
      } else {
        return <PostSmall key={item.id} item={item} />
      }
    })
  }, [loadedPosts])

  useEffect(() => {
    setPage(1)
    setLoadedPosts([])
  }, [search, currentTags])

  useEffect(() => {
    if(posts) {
      setLoadedPosts(prev => ([
        ...prev.filter(post => getPostSearchCondition(post, search)),
        ...posts.filter(post => !prev.find(prev_post => prev_post.id === post.id))
      ]))
    }
  }, [posts])

  return (
    <>
      <TagSidebar />
      <SearchItems setSearch={setSearch} classes={{ wrapper: styles.post_search }} />
      {
        isLoading ? <Loading /> :
        error ? <ErrorPage text={error.message} /> : 
        memorizedPosts && memorizedPosts.length > 0 ? 
          <>
            <div className={styles.posts_container}>
              { memorizedPosts }
            </div>
            { maxPostsCount !== memorizedPosts.length && <div className="loading_posts" onClick={() => setPage(prev => prev + 1)}>Показать ещё</div> }
          </>
        : <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
      }
    </>
  )
}

export default Home
