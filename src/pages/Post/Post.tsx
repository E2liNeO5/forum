import { useMemo } from 'react'
import { useAppSelector } from '../../hooks/typedHooks'
import styles from './Post.module.scss'
import { useParams } from 'react-router'
import { Post } from '../../types/post'
import Comments from '../../components/Comments/Comments'

const Post = () => {
  const { id } = useParams()
  const posts = useAppSelector(state => state.posts).posts

  const post: Post | undefined = useMemo(() => {
    return posts.find(p => p.id === Number(id))
  }, [id])

  return (
    <>
      { !post ? <h1 style={{ textAlign: 'center' }}>Пост не найден</h1> :
        <div className={styles.post_container}>
          <div className={styles.post_image}>
            <img
              src={`/upload/${post.image || 'not_found_img.png'}`}
              alt={`${post.id}_post_picture`}
              className={post.imageSize === 'width' ? styles.size_by_width : styles.size_by_height}
            />
          </div>
          <div className={styles.post_text}>
            { post.text }
          </div>
          { post.comments && <Comments id={post.id} /> }
        </div>
      }
    </>
    
  )
}

export default Post