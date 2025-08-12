import { ChevronDown } from 'lucide-react'
import styles from './PasswordEditor.module.scss'
import { useEffect, useState } from 'react'
import useGetUser from '../../../hooks/user/useGetUser'
import Form from '../../../components/UI/Form/Form'
import { useForm } from 'react-hook-form'
import { TPasswordChange } from '../../../types/user.types'
import Input from '../../../components/UI/Input/Input'
import useEditUserPassword from '../../../hooks/user/useEditUserPassword'

const PasswordEditor = () => {
  const currentUser = useGetUser()
  const editUserPassword = useEditUserPassword()

  const [isOpen, setIsOpen] = useState(false)

  const { handleSubmit, formState: { errors }, register, reset, watch } = useForm<TPasswordChange>()
  const onSubmit = (data: TPasswordChange) => {
    editUserPassword({
      id: Number(currentUser?.id),
      password: data.newPassword
    })
    setIsOpen(false)
  }

  useEffect(() => {
    if(!isOpen)
      reset()
  }, [isOpen])

  return (
    <div className={`${styles.wrapper}${isOpen ? ' ' + styles.open : ''}`}>
      <h2 className={styles.title}>Изменить пароль <ChevronDown className={styles.toggle} onClick={() => setIsOpen(prev => !prev)} /></h2>
      <div className={styles.container}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          button='Изменить'
          classes={{
            wrapper: styles.form_wrapper,
            form: styles.form,
            button: styles.confirm_btn
          }}
        >
          <Input
            register={register('currentPassword', {
              required: true
            })}
            label='Текущий пароль'
            type='password'
            error={errors.currentPassword}
            classes={{
              block: styles.block
            }}
          />
          <Input
            register={register('newPassword', {
              required: true,
              validate: {
                customValidate: (value: string) => value !== currentUser?.password ? true : 'Старый пароль совпадает с новым'
              }
            })}
            label='Новый пароль'
            type='password'
            error={errors.newPassword}
            classes={{
              block: styles.block
            }}
          />
          <Input
            register={register('applyPassword', {
              required: true,
              validate: {
                customValidate: (value: string) => value === watch('newPassword') ? true : 'Неверно введено подтверждение пароля'
              }
            })}
            label='Подтвердите пароль'
            type='password'
            error={errors.applyPassword}
            classes={{
              block: styles.block
            }}
          />
        </Form>
      </div>
    </div>
  )
}

export default PasswordEditor