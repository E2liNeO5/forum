import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import styles from './Input.module.scss'
import { useCallback } from 'react'

type extraKeys = keyof (Exclude<Props['classes'], undefined>)

type Props = {
  label: string
  type: string
  error?: FieldError
  register: UseFormRegisterReturn<string>
  classes?: {
    label?: string
    input?: string
    block?: string
  }
}

const Input = ({ label, type, error, register, classes }: Props) => {
  const addExtraClass = useCallback((item: extraKeys) => {
    return classes && classes[item] ? ' ' + classes[item] : ''
  }, [])

  return (
    <label className={`${styles.input_block + (addExtraClass('block'))}`}>
      <span className={`${styles.input_label + (addExtraClass('label'))}`}>{ label }</span>
      <input
        className={`${error ? styles.invalid : ''}${addExtraClass('input')}`}
        type={type}
        { ...register }
      />
    </label>
  )
}

export default Input