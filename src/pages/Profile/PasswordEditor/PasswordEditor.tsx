import { ChevronDown } from 'lucide-react'
import styles from './PasswordEditor.module.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import useGetUser from '../../../hooks/user/useGetUser'
import Form from '../../../components/UI/Form/Form'
import { useForm } from 'react-hook-form'
import { TPasswordChange } from '../../../types/user.types'
import Input from '../../../components/UI/Input/Input'

const PasswordEditor = () => {
  const currentUser = useGetUser()
  const { handleSubmit, formState: { errors }, register, reset } = useForm<TPasswordChange>()

  const [isOpen, setIsOpen] = useState(true)
 
  useEffect(() => {
    if(!isOpen)
      reset()
  }, [isOpen])

  const onSubmit = (data: TPasswordChange) => console.log(data)

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
              required: true
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
              required: true
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