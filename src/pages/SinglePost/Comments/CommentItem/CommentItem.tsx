import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import styles from './CommentItem.module.scss'
import { Link } from 'react-router'
import { useParams } from 'react-router'
import useActions from '../../../../hooks/useActions'
import useGetUser from '../../../../hooks/user/useGetUser'
import useCheckUserRole from '../../../../hooks/user/useCheckUserRole'
import { parseToSafeHtml } from '../../../../utils'
import { HEADER_HEIGHT_OFFSET } from '../../../../constants'
import ReportButton from '../../../../components/UI/ReportButton/ReportButton'
import { Trash2 } from 'lucide-react'
import useDeleteComment from '../../../../hooks/posts/useDeleteComment'
import { TCommentItem } from '../../../../types/comment.types'
import Modal from '../../../../components/UI/Modal/Modal'
import ConfirmDialog from '../../../../components/UI/Modal/ConfirmDialog/ConfirmDialog'

type Props = {
  id: number
  text: string
  authorId: number
  authorName: string
  authorImage: string
  date: string
  setLoadedComments: Dispatch<SetStateAction<TCommentItem[]>>
}

const CommentItem = ({ id, text, authorId, authorImage, authorName, date, setLoadedComments }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { addToTextarea } = useActions()
  const ref = useRef<HTMLDivElement>(null)
  
  const user = useGetUser()
  const { role, isAdmin } = useCheckUserRole()
  const deleteComment = useDeleteComment()

  const answerHandler = useCallback(() => {
    if(user && role !== 'banned')
      addToTextarea(`<@${authorId}|${authorName},> `)
  }, [authorId])

  const { comment_id } = useParams()

  useEffect(() => {
    if(comment_id && +comment_id === id && ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - HEADER_HEIGHT_OFFSET,
        left: ref.current.offsetLeft,
        behavior: 'smooth'
      })
    }
  }, [comment_id])

  const deleteHandler = () => {
    deleteComment(id)
      .then(() => {
        setLoadedComments(prev => prev.filter(comment => comment.id !== id))
      })
  }

  return (
    <div className={`${styles.wrapper}${comment_id && Number(comment_id) === id ? ' ' + styles.glowing : ''}`} ref={ref}>
      <div className={styles.details}>
        <div className={styles.author}>
          <img className={styles.author_image} src={`/upload/${authorImage}`} alt="author_image" />
          <div className={styles.author_details}>
            <div>
              Автор: <Link to={`/profile/${authorId}`} className={styles.author_name}>{ authorName }</Link>
            </div>
            <div className={styles.answer} onClick={answerHandler}>
              Ответить
            </div>
          </div>
        </div>

        <div>
          <div className={styles.date}>
            Дата: { date }
          </div>
          <div className={styles.comment_options}>
            <ReportButton
              size={18}
              url={`${window.location.href}/${id}`}
              userId={authorId}
            />
            { isAdmin && <Trash2 className={styles.comment_delete_btn} size={18} onClick={() => setModalIsOpen(true)} /> }
          </div>
        </div>
        
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: parseToSafeHtml(text) }}>
      </div>

      { modalIsOpen && <Modal title='Удалить комментарий?' onClose={() => setModalIsOpen(false)}>
        <ConfirmDialog
          yesHandler={deleteHandler}
          noHandler={() => setModalIsOpen(false)}
        />
      </Modal> }
    </div>
  )
}

export default CommentItem