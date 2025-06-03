import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Forms.module.scss'
import { Link } from 'react-router'
import { AuthData } from '../../types/user'
import useSignIn from '../../hooks/auth/useSignIn'
import Input from './Input'

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthData>()

  const signIn = useSignIn()
  const onSubmit: SubmitHandler<AuthData> = async (data: AuthData) => signIn(data)

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
        <Link to={'/signUp'} className={styles.hint_small}>Нет аккаунта? Зарегистрируйте его!</Link>
        <button className={styles.form_btn}>Войти</button>
      </form>
    </div>
  )
}

export default SignIn