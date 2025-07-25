import { useCallback } from 'react'
import { parseToSafeHtml } from '../../../utils'
import styles from './CommentItem.module.scss'
import useActions from '../../../hooks/useActions'
import { Link } from 'react-router'
import useGetUser from '../../../hooks/user/useGetUser'
import useCheckUserRole from '../../../hooks/user/useCheckUserRole'

type Props = {
  text: string
  authorId: number
  authorName: string
  authorImage: string
  date: string
}

const CommentItem = ({ text, authorId, authorImage, authorName, date }: Props) => {
  const { addToTextarea } = useActions()
  
  const user = useGetUser()
  const { role } = useCheckUserRole()

  const answerHandler = useCallback(() => {
    if(user && role !== 'banned')
      addToTextarea(`<@${authorId}|${authorName},> `)
  }, [authorId])

  return (
    <div className={styles.wrapper}>
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