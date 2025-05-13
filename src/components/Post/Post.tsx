import styles from './Post.module.scss'
import { Post } from '../../types/post'

type Props = {
  item: Post
}

const Post = ({ item }: Props) => {
  return (
    <div className={styles.post_item}>
      <div className={styles.post_front}>
        <div className={styles.post_title}>{ item.title }</div>
        <img
          src={`/images/${item.image || 'not_found_img.png'}`}
          alt={`${item.id}_post_picture`}
          className={item.imageSize === 'width' ? styles.size_by_width : styles.size_by_height}
        />
      </div>
      <div className={styles.post_back}>
        <div className={styles.post_text}>
          { item.text }
        </div>
      </div>
    </div>
  )
}

export default Post