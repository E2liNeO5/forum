import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Forms.module.scss'

type DataType = {
  login: string
  password: string
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DataType>()

  const onSubmit: SubmitHandler<DataType> = (data: DataType) => {
    console.log(data)
  }

  return (
    <div className={styles.form_wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.input_block}>
          <span className={styles.input_label}>Логин</span>
          <input
            className={errors && errors.login && styles.invalid}
            type="text"
            { ...register('login', {
              required: true
            }) }
          />
        </label>
        <label className={styles.input_block}>
          <span className={styles.input_label}>Пароль</span>
          <input
            className={errors && errors.password && styles.invalid}
            type="text"
            { ...register('password', {
              required: true
            }) }
          />
        </label>
        <button className={styles.form_btn}>Войти</button>
      </form>
    </div>
  )
}

export default Login