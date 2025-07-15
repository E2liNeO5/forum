import styles from './Post.module.scss'
import { TSinglePost } from '../../types/post.types'
import { Link } from 'react-router'
import { parseToSafeHtml } from '../../utils'

type Props = {
  item: TSinglePost
  side: 'left' | 'right'
}

const Post = ({ item, side }: Props) => {
  return (
    <Link  to={`/post/${item.id}`} className={styles.post_item + ' ' + (side === 'right' ? styles.post_right : styles.post_left)}>
      {
        side === 'right' ?
        <>
          <div className={styles.content_container}>
          <div className={styles.post_details}>
            <div className={styles.post_author}>Автор: { item.user.login }</div>
            <div className={styles.post_date}>Дата: { item.date }</div>
          </div>
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
        </> : 
        <>
          <div className={styles.post_info}>
            <div className={styles.post_title}>{ item.title }</div>
            <img
              src={`/upload/${item.image}`}
              alt={`${item.id}_post_picture`}
              className={item.imageSize === 'width' ? styles.size_by_width : styles.size_by_height}
            />
          </div>
          <div className={styles.content_container}>
            <div className={styles.post_details}>
              <div className={styles.post_author}>Автор: { item.user.login }</div>
              <div className={styles.post_date}>Дата: { item.date }</div>
            </div>
            <div className={styles.post_text} dangerouslySetInnerHTML={{ __html: parseToSafeHtml(item.text) }} />
          </div>
        </>
      }

    </Link>
  )
}

export default Post