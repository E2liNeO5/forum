import styles from './SinglePost.module.scss'
import { Link, useParams } from 'react-router'
import Comments from './Comments/Comments'
import useGetSinglePost from '../../hooks/posts/useGetSinglePost'
import Loading from '../../components/UI/Loading/Loading'
import { parseToSafeHtml } from '../../utils'
import DivideLine from '../../components/UI/DivideLine/DivideLine'
import ReportButton from '../../components/UI/ReportButton/ReportButton'
import { Trash2 } from 'lucide-react'
import useCheckUserRole from '../../hooks/user/useCheckUserRole'
import Modal from '../../components/UI/Modal/Modal'
import ConfirmDialog from '../../components/UI/Modal/ConfirmDialog/ConfirmDialog'
import useDeletePost from '../../hooks/posts/useDeletePost'
import { useState } from 'react'

const SinglePost = () => {
  const { id } = useParams()
  const { isLoading, error, post } = useGetSinglePost(Number(id))
  
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { isAdmin } = useCheckUserRole()
  const deletePost = useDeletePost()

  const deleteHandler = () => {
    deletePost(Number(id))
  }

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
                <div className={styles.post_user}>
                  <img src={`/upload/${post.user.image}`} className={styles.user_image} alt="user avatar" />
                  <div>
                    Автор:
                    <Link to={`/profile/${post.user.id}`} className={styles.user_name}>
                      { ' ' + post.user.login }
                    </Link>
                  </div>
                </div>
                <div className={styles.post_data}>Дата: { post.date }</div>
                <div className={styles.post_options}>
                  <ReportButton url={window.location.href} userId={post.authorId} />
                  { isAdmin && <Trash2 className={styles.post_delete_btn} onClick={() => setModalIsOpen(true)} /> }
                </div>
              </div>
              <div className={styles.post_tags}>Тэги: { post.tagsByName.join(', ') }</div>
              <div className={styles.post_title}>
                <div className={styles.title_text}>{ post.title }</div>
              </div>
              <div className={styles.post_text} dangerouslySetInnerHTML={{ __html: parseToSafeHtml(post.text) }} />
            </div>
          </div>
          <DivideLine width='80%' />
          <Comments postId={post.id} />
          { modalIsOpen && <Modal title='Удалить пост?' onClose={() => setModalIsOpen(false)}>
            <ConfirmDialog
              yesHandler={deleteHandler}
              noHandler={() => setModalIsOpen(false)}
            />
          </Modal> }
        </>
      }
    </>
  )
}

export default SinglePost