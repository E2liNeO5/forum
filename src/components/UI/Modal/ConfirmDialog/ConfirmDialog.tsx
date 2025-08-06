import styles from './ConfirmDialog.module.scss'

type Props = {
  yesHandler: () => void
  noHandler: () => void
  yesText?: string
  noText?: string
  disabled?: boolean
}

const ConfirmDialog = ({ yesHandler, noHandler, yesText, noText, disabled }: Props) => {
  return (
    <div className={styles.container}>
      <button className={`btn ${styles.answer_btn}`} onClick={yesHandler} disabled={disabled}>{ yesText ? yesText : 'Да' }</button>
      <button className={`btn ${styles.answer_btn}`} onClick={noHandler}>{ noText ? noText : 'Нет' }</button>
    </div>
  )
}

export default ConfirmDialog