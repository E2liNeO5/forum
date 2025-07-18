import { parseToSafeHtml } from '../../../utils'
import styles from './CommentItem.module.scss'

type Props = {
  text: string
  authorName: string
  authorImage: string
  date: string
}

const CommentItem = ({ text, authorImage, authorName, date }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.details}>
        <div className={styles.author}>
          <img className={styles.author_image} src={`/upload/${authorImage}`} alt="author_image" />
          <div>Автор: <span className={styles.author_name}>{ authorName }</span></div>
        </div>

        <div className={styles.date}>
          Дата: { date }
        </div>
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: parseToSafeHtml(text) }} />
    </div>
  )
}

export default CommentItem