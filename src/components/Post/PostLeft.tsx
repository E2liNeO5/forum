import styles from './PostItem.module.scss'
import { Post } from '../../types/post'
import { Link } from 'react-router'
import { parseToSafeHtml } from '../../utils'

type Props = {
  item: Post
}

const PostLeft = ({ item }: Props) => {
  return (
    <Link to={`/post/${item.id}`} className={styles.post_item + ' ' + styles.post_left}>
      <div className={styles.post_info}>
        <div className={styles.post_title}>{ item.title }</div>
        <img
          src={`/upload/${item.image}`}
          alt={`${item.id}_post_picture`}
          className={item.imageSize === 'width' ? styles.size_by_width : styles.size_by_height}
        />
      </div>
      <div className={styles.post_text} dangerouslySetInnerHTML={{ __html: parseToSafeHtml(item.text) }} />
    </Link>
  )
}

export default PostLeft