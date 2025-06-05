import styles from './ErrorPage.module.scss'

type Props = {
  text: string
}

const ErrorPage = ({ text }: Props) => {
  return (
    <div className={styles.container}>
      <h1>{ text }</h1>
    </div>
  )
}

export default ErrorPage