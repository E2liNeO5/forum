import styles from './Comments.module.scss'

type Props = {
  id: number
}

const Comments = ({}: Props) => {
  return (
    <div className={styles.container}>
      comments
    </div>
  )
}

export default Comments