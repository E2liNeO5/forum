import styles from './ConfirmDialog.module.scss'

type Props = {
  yesHandler: () => void
  noHandler: () => void
  disabled?: boolean
}

const ConfirmDialog = ({ yesHandler, noHandler, disabled }: Props) => {
  return (
    <div className={styles.container}>
      <button className={`btn ${styles.answer_btn}`} onClick={yesHandler} disabled={disabled}>Да</button>
      <button className={`btn ${styles.answer_btn}`} onClick={noHandler}>Нет</button>
    </div>
  )
}

export default ConfirmDialog