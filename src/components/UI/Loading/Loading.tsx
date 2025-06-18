import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading_text}>Загрузка</div>
    </div>
  )
}

export default Loading