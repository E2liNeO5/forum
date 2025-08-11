import { useEffect, useState } from 'react'
import styles from './Comments.module.scss'
import useGetPostComments from '../../../hooks/posts/useGetPostComments'
import { useParams } from 'react-router'
import { TCommentItem } from '../../../types/comment.types'
import useGetUser from '../../../hooks/user/useGetUser'
import CommentCreate from './CommentCreate/CommentCreate'
import Loading from '../../../components/UI/Loading/Loading'
import ErrorPage from '../../ErrorPage/ErrorPage'
import CommentItem from './CommentItem/CommentItem'
import { useLazyIsCommentExistQuery } from '../../../store/api/post.api'
import useActions from '../../../hooks/useActions'

type Props = {
  postId: number
}

const Comments = ({ postId }: Props) => {
  const [page, setPage] = useState(1)
  const [loadedComments, setLoadedComments] = useState<TCommentItem[]>([])
  const [isCommentExist, setIsCommentExist] = useState(false)

  const { isLoading, error, comments, maxComments } = useGetPostComments(postId, page)
  const user = useGetUser()
  const [isCommentExistTrigger] = useLazyIsCommentExistQuery()
  const { addToast } = useActions()

  const { comment_id } = useParams()

  useEffect(() => {
    if(comments) {
      setLoadedComments(prev => ([
        ...prev,
        ...comments.filter(comment => !prev.find(prev_comment => prev_comment.id === comment.id))
      ]))
    }
  }, [comments])

  useEffect(() => {
    if(comment_id && isCommentExist && loadedComments.length > 0 && !loadedComments.find(comment => comment.id === Number(comment_id)))
      setPage(prev => prev + 1)
  }, [loadedComments])

  useEffect(() => {
    if(comment_id) {
      (async () => {
          const res = await isCommentExistTrigger({ id: Number(comment_id), postId })
          if(res.isError || !res.data)
            addToast({ text: `Комментарий с id "${comment_id}" не найден`, type: 'error' })
          if(!res.isError && !res.isLoading && res.data)
            setIsCommentExist(res.data)
      })()
    }
}, [comment_id])

  return (
    <>
      <h3 className={styles.comments_title}>Комментарии: </h3>
      { user && <CommentCreate postId={postId} setLoadedComments={setLoadedComments} /> }
      <div className={styles.container}>
        {
          isLoading ? <Loading /> : 
          error ? <ErrorPage text={error.message} /> :
          <>
            {
              loadedComments.map(comment =>
              <CommentItem
                key={comment.id}
                id={comment.id}
                text={comment.text}
                authorId={comment.user.id}
                authorImage={comment.user.image}
                authorName={comment.user.login}
                date={comment.date}
                setLoadedComments={setLoadedComments}
              />)
            }
            { !!maxComments && loadedComments.length > 1  && maxComments > loadedComments.length &&
              <div className="loading_posts" onClick={() => setPage(prev => prev + 1)}>Показать ещё</div> }
          </>
        }
      </div>
    </>
  )
}

export default Comments