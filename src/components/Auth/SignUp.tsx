import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../UI/Input/Input'
import { TSignUpData } from '../../types/user.types'
import useSignUp from '../../hooks/auth/useSignUp'
import Form from '../UI/Form/Form'
import FileInput from '../UI/Input/FileInput/FileInput'

const SignIn = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TSignUpData>()

  const signUp = useSignUp()
  const onSubmit: SubmitHandler<TSignUpData> = async (data: TSignUpData) => signUp(data)

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
      <FileInput
        label='Аватар'
        error={errors.image}
        register={register('image', {
          required: true
        })}
        fieldName='image'
        setValue={setValue}
      />
    </Form>
  )
}

export default SignIn