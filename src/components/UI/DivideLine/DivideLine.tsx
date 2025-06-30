import styles from './DivideLine.module.scss'

type Props = {
  width: string
  left?: string
  center?: boolean
}

const DivideLine = ({ width, left, center }: Props) => {
  return (
    <div className={`${styles.divide_line}${center ? ' ' + styles.center : ''}`} style={{ width, left }}></div>
  )
}

export default DivideLine