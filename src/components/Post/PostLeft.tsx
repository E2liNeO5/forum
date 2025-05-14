import styles from './Post.module.scss'
import { Post } from '../../types/post'

type Props = {
  item: Post
}

const PostLeft = ({ item }: Props) => {
  return (
    <div className={styles.post_item + ' ' + styles.post_left}>
      <div className={styles.post_info}>
        <div className={styles.post_title}>{ item.title }</div>
        <img
          src={`/images/${item.image || 'not_found_img.png'}`}
          alt={`${item.id}_post_picture`}
          className={item.imageSize === 'width' ? styles.size_by_width : styles.size_by_height}
        />
      </div>
      <div className={styles.post_text}>
        { item.text }
      </div>
    </div>
  )
}

export default PostLeft