import { useCallback, useEffect, useRef } from 'react'
import styles from './CommentItem.module.scss'
import { Link } from 'react-router'
import { useParams } from 'react-router'
import useActions from '../../../../hooks/useActions'
import useGetUser from '../../../../hooks/user/useGetUser'
import useCheckUserRole from '../../../../hooks/user/useCheckUserRole'
import { parseToSafeHtml } from '../../../../utils'
import { HEADER_HEIGHT_OFFSET } from '../../../../constants'

type Props = {
  id: number
  text: string
  authorId: number
  authorName: string
  authorImage: string
  date: string
}

const CommentItem = ({ id, text, authorId, authorImage, authorName, date }: Props) => {
  const { addToTextarea } = useActions()
  const ref = useRef<HTMLDivElement>(null)
  
  const user = useGetUser()
  const { role } = useCheckUserRole()

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

        <div className={styles.date}>
          Дата: { date }
        </div>
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: parseToSafeHtml(text) }}>
      </div>
    </div>
  )
}

export default CommentItem