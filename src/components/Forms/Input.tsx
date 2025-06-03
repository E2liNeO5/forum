import { FieldError, UseFormRegister } from 'react-hook-form'
import styles from './Forms.module.scss'

type Props = {
  input: {
    label: string
    type: string
    name: string
    error?: FieldError
    register: UseFormRegister<any>
  }
}

const Input = ({ input }: Props) => {
  return (
    <label className={styles.input_block}>
      <span className={styles.input_label}>{ input.label }</span>
      <input
        className={input.error && styles.invalid}
        type={input.type}
        { ...input.register(input.name, {
          required: true
        }) }
      />
    </label>
  )
}

export default Input