import DivideLine from '../../components/UI/DivideLine/DivideLine'
import styles from './ErrorPage.module.scss'

type Props = {
  text: string
}

const ErrorPage = ({ text }: Props) => {
  return (
    <div className={styles.container}>
      <h1>{ text }</h1>
      <DivideLine width='100%' left='5%' />
    </div>
  )
}

export default ErrorPage