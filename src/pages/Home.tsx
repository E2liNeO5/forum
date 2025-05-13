import { useMemo } from "react"
import styles from '../components/Post/Post.module.scss'
import Post from "../components/Post/Post"
import useGetPosts from "../hooks/posts/useGetPosts"

function Home() {
  const posts = useGetPosts()
  const memorizedPosts = useMemo(() => posts.map(item => <Post key={item.id} item={item} />), [posts])

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
