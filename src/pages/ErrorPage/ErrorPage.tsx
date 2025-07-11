import DivideLine from '../../components/UI/DivideLine/DivideLine'
import styles from './ErrorPage.module.scss'

type Props = {
  text: string
  fontSize?: string
}

const ErrorPage = ({ text, fontSize }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.text} style={{ fontSize: fontSize || '32px' }}>{ text }</div>
      <DivideLine width='100%' left='5%' />
    </div>
  )
}

export default ErrorPage