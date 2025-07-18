import styles from './Post.module.scss'
import { TSinglePost } from '../../types/post.types'
import { Link } from 'react-router'
import { parseToSafeHtml } from '../../utils'

type Props = {
  item: TSinglePost
}

const PostSmall = ({ item }: Props) => {
  return (
    <Link to={`/post/${item.id}`} className={styles.post_item}>
      <div className={styles.post_front}>
        <div className={styles.post_title}>{ item.title }</div>
        <img
          src={`/upload/${item.image}`}
          alt={`${item.id}_post_picture`}
          className={item.imageSize === 'width' ? styles.size_by_width : styles.size_by_height}
        />
      </div>
      <div className={styles.post_back}>
        <div className={styles.post_details}>
          <div className={styles.post_author}>Автор: { item.user.login }</div>
          <div className={styles.post_date}>Дата: { item.date }</div>
        </div>
        
        <div className={styles.post_text} dangerouslySetInnerHTML={{ __html: parseToSafeHtml(item.text) }} />
      </div>
    </Link>
  )
}

export default PostSmall