import { FormEventHandler, PropsWithChildren } from 'react'
import styles from './Form.module.scss'

type Props = {
  button: string
  onSubmit: FormEventHandler<HTMLFormElement>
  extraClass?: string
}

const Form = ({ children, button, onSubmit, extraClass }: Props & PropsWithChildren) => {
  return (
    <div className={styles.form_wrapper}>
      <form className={`${styles.form + (extraClass ? ' ' + extraClass : '')}`} onSubmit={onSubmit}>
        { children }
        <button className={styles.form_btn}>{button}</button>
      </form>
    </div>
  )
}

export default Form