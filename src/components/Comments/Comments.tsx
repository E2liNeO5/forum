import useGetPostComments from '../../hooks/posts/useGetPostComments'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import Loading from '../UI/Loading/Loading'
import CommentItem from './CommentItem/CommentItem'
import styles from './Comments.module.scss'

type Props = {
  postId: number
}

const Comments = ({ postId }: Props) => {
  const { isLoading, error, comments } = useGetPostComments(postId)

  return (
    <div className={styles.container}>
      {
        isLoading ? <Loading /> : 
        error ? <ErrorPage text={error.message} /> :
        !comments || comments.length === 0 ? <></> :
        comments.map(comment =>
          <CommentItem
            key={comment.id}
            text={comment.text}
            authorImage={comment.user.image}
            authorName={comment.user.login}
            date={comment.date}
          />)
      }
    </div>
  )
}

export default Comments