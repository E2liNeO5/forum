import { useEffect, useState } from 'react'
import useGetPostComments from '../../hooks/posts/useGetPostComments'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import Loading from '../UI/Loading/Loading'
import CommentItem from './CommentItem/CommentItem'
import styles from './Comments.module.scss'
import { TCommentItem } from '../../types/comment.types'
import CommentCreate from './CommentCreate/CommentCreate'

type Props = {
  postId: number
}

const Comments = ({ postId }: Props) => {
  const [page, setPage] = useState(1)
  const [loadedComments, setLoadedComments] = useState<TCommentItem[]>([])

  const { isLoading, error, comments, maxComments } = useGetPostComments(postId, page)

  useEffect(() => {
    if(comments) {
      setLoadedComments(prev => ([
        ...prev,
        ...comments.filter(comment => !prev.find(prev_comment => prev_comment.id === comment.id))
      ]))
    }
  }, [comments])

  return (
    <>
      <h3 className={styles.comments_title}>Комментарии: </h3>
      <CommentCreate postId={postId} setLoadedComments={setLoadedComments} />
      <div className={styles.container}>
        {
          isLoading ? <Loading /> : 
          error ? <ErrorPage text={error.message} /> :
          !comments || comments.length === 0 ? <></> :
          <>
            {
              loadedComments.map(comment =>
              <CommentItem
                key={comment.id}
                text={comment.text}
                authorImage={comment.user.image}
                authorName={comment.user.login}
                date={comment.date}
              />)
            }
            { maxComments !== loadedComments.length && <div className="loading_posts" onClick={() => setPage(prev => prev + 1)}>Показать ещё</div> }
          </>
        }
      </div>
    </>
  )
}

export default Comments