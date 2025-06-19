import { useMemo } from 'react'
import { useAppSelector } from '../../hooks/typedHooks'
import styles from './Post.module.scss'
import { useParams } from 'react-router'
import { Post } from '../../types/post'
import Comments from '../../components/Comments/Comments'
import useGetSinglePost from '../../hooks/posts/useGetSinglePost'
import Loading from '../../components/UI/Loading/Loading'

const Post = () => {
  const { id } = useParams()
  const { isLoading, error, post } = useGetSinglePost(Number(id))
  console.log(post?.imageSize)
  return (
    <>
      { 
        isLoading ? <Loading /> :
        error ? <h1 style={{ textAlign: 'center' }}>Пост не найден</h1> :
        <>
          <div className={styles.post_container}>
          <div className={styles.post_image}>
            <img
              src={`/upload/${post?.image}`}
              alt={`${post?.id}_post_picture`}
              className={post?.imageSize === 'width' ? styles.size_by_width : styles.size_by_height}
            />
          </div>
          <div className={styles.post_text}>
            { post?.text }
          </div>
        </div>
        { post?.comments && <Comments id={post?.id} /> }
        </>
      }
    </>
  )
}

export default Post