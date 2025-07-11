import styles from './PostItem.module.scss'
import { TPost } from '../../types/post.types'
import { Link } from 'react-router'
import { parseToSafeHtml } from '../../utils'

type Props = {
  item: TPost
}

const PostRight = ({ item }: Props) => {
  return (
    <Link  to={`/post/${item.id}`} className={styles.post_item + ' ' + styles.post_right}>
      <div className={styles.content_container}>
        <div className={styles.post_date}>Дата: { item.date }</div>
        <div className={styles.post_text} dangerouslySetInnerHTML={{ __html: parseToSafeHtml(item.text) }} />
      </div>
      <div className={styles.post_info}>
        <div className={styles.post_title}>{ item.title }</div>
        <img
          src={`/upload/${item.image}`}
          alt={`${item.id}_post_picture`}
          className={item.imageSize === 'width' ? styles.size_by_width : styles.size_by_height}
        />
      </div>
    </Link>
  )
}

export default PostRight