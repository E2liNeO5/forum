import { useMemo } from "react"
import styles from '../components/Post/Post.module.scss'
import Post from "../components/Post/Post"
import useGetPosts from "../hooks/posts/useGetPosts"
import PostLeft from "../components/Post/PostLeft"
import PostRight from "../components/Post/PostRight"

function Home() {
  const posts = useGetPosts()
  const memorizedPosts = useMemo(() => {
    let count = 0
    return posts.map(item => {
      count++
      if(count === 5)
        count = 1

      if(count === 1)
        return <PostLeft key={item.id} item={item} />
      else if(count === 4) {
        return <PostRight key={item.id} item={item} />
      } else {
        return <Post key={item.id} item={item} />
      }
    })
  }, [posts])

  return (
    <>
      {
        memorizedPosts.length > 0 ? 
          <div className={styles.posts_container}>
            { memorizedPosts }
          </div>
        : <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
      }
    </>
  )
}

export default Home
