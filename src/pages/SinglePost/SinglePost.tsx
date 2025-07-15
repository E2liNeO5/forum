import styles from './SinglePost.module.scss'
import { Link, useParams } from 'react-router'
import Comments from '../../components/Comments/Comments'
import useGetSinglePost from '../../hooks/posts/useGetSinglePost'
import Loading from '../../components/UI/Loading/Loading'
import { parseToSafeHtml } from '../../utils'
import DivideLine from '../../components/UI/DivideLine/DivideLine'

const SinglePost = () => {
  const { id } = useParams()
  const { isLoading, error, post } = useGetSinglePost(Number(id))

  return (
    <>
      { 
        isLoading ? <Loading /> :
        !post || error ? <h1 style={{ textAlign: 'center' }}>Пост не найден</h1> :
        <>
          <div className={styles.post_container}>
            <div className={styles.post_image}>
              <img
                src={`/upload/${post.image}`}
                alt={`${post.id}_post_picture`}
                className={post.imageSize === 'width' ? styles.size_by_width : styles.size_by_height}
              />
            </div>
            <div className={styles.content_container}>
              <div className={styles.post_details}>
                <Link to={`/profile/${post.user.id}`} className={styles.post_user}>
                  <img src={`/upload/${post.user.image}`} alt="user avatar" />
                  <span className={styles.post_author}>Автор: { post.user.login }</span>
                </Link>
                <div className={styles.post_data}>Дата: { post.date }</div>
              </div>
              <div className={styles.post_tags}>Тэги: { post.tags.join(', ') }</div>
              <div className={styles.post_text} dangerouslySetInnerHTML={{ __html: parseToSafeHtml(post.text) }} />
            </div>
          </div>
          { post.comments &&
            <>
              <DivideLine width='80%' />
              <Comments id={post.id} />
            </> }
        </>
      }
    </>
  )
}

export default SinglePost