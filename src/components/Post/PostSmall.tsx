import styles from './PostItem.module.scss'
import { Post } from '../../types/post'
import useShowPost from '../../hooks/posts/useShowPost'
import { Link } from 'react-router'

type Props = {
  item: Post
}

const PostSmall = ({ item }: Props) => {
  // const showPost = useShowPost()

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
        <div className={styles.post_text}>
          { item.text }
        </div>
      </div>
    </Link>
  )
}

export default PostSmall