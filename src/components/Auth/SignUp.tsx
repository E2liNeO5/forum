import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../UI/Input/Input'
import { TAuthData } from '../../types/user.types'
import useSignUp from '../../hooks/auth/useSignUp'
import Form from '../UI/Form/Form'

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TAuthData>()

  const signUp = useSignUp()
  const onSubmit: SubmitHandler<TAuthData> = async (data: TAuthData) => signUp(data)

  return (
    <Form button='Зарегистрироваться' onSubmit={handleSubmit(onSubmit)}>
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
    </Form>
  )
}

export default SignIn