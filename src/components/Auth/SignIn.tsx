import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { TAuthData } from '../../types/user.types'
import useSignIn from '../../hooks/auth/useSignIn'
import Input from '../UI/Input/Input'
import Form from '../UI/Form/Form'
import styles from './Auth.module.scss'

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TAuthData>()

  const signIn = useSignIn()
  const onSubmit: SubmitHandler<TAuthData> = async (data: TAuthData) => signIn(data)

  return (
      <Form button='Войти' onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Логин'
          type='text'
          error={errors.login}
          register={register('login', {
            required: true
          })}
        />
        <Input
          label='Пароль'
          type='password'
          error={errors.password}
          register={register('password', {
            required: true
          })}
        />
        <Link to={'/signUp'} className={styles.hint_small}>Нет аккаунта? Зарегистрируйте его!</Link>
      </Form>
  )
}

export default SignIn