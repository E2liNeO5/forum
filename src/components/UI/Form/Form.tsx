import { FormEventHandler, PropsWithChildren } from 'react'
import styles from './Form.module.scss'
import { TExtraClass } from '../../../types/global.types'
import useExtraClass from '../../../hooks/useExtraClass'

type Props = {
  button: string
  onSubmit: FormEventHandler<HTMLFormElement>
  classes?: TExtraClass
}

const Form = ({ children, button, onSubmit, classes }: Props & PropsWithChildren) => {
  const addExtraClass = useExtraClass(classes)

  return (
    <div className={`${styles.form_wrapper + (addExtraClass('wrapper'))}`}>
      <form className={`${styles.form + (addExtraClass('form'))}`} onSubmit={onSubmit}>
        { children }
        <button className={`btn${addExtraClass('button')}`}>{button}</button>
      </form>
    </div>
  )
}

export default Form