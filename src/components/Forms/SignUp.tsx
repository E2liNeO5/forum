import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Forms.module.scss'
import Input from './Input'
import { AuthData } from '../../types/user'
import useSignUp from '../../hooks/auth/useSignUp'

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthData>()

  const signUp = useSignUp()
  const onSubmit: SubmitHandler<AuthData> = async (data: AuthData) => signUp(data)

  return (
    <div className={styles.form_wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input input={{
          label: 'Логин',
          type: 'text',
          name: 'login',
          error: errors.login,
          register
        }} />
        <Input input={{
          label: 'Пароль',
          type: 'password',
          name: 'password',
          error: errors.password,
          register
        }} />
        <button className={styles.form_btn}>Зарегистрироваться</button>
      </form>
    </div>
  )
}

export default SignIn