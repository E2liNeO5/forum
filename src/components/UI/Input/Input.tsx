import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import styles from './Input.module.scss'
import { memo, useEffect } from 'react'
import { TExtraClass } from '../../../types/global.types'
import useExtraClass from '../../../hooks/useExtraClass'
import useActions from '../../../hooks/useActions'

type Props = {
  label: string
  type: string
  error?: FieldError
  register: UseFormRegisterReturn<string>
  classes?: TExtraClass
}

const Input = ({ label, type, error, register, classes }: Props) => {
  const addExtraClass = useExtraClass(classes)
  const { addToast } = useActions()

  useEffect(() => {
    if(error && error.type === 'customValidate')
      addToast({ text: error.message || 'Ошибка', type: 'error' })
  }, [error])

  return (
    <label className={styles.input_block + addExtraClass('block')}>
      <span className={styles.input_label + addExtraClass('label')}>{ label }</span>
      <input
        className={`${error ? styles.invalid : ''}${addExtraClass('input')}`}
        type={type}
        { ...register }
      />
    </label>
  )
}

export default memo(Input)