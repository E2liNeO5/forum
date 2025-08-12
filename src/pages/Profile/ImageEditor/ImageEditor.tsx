import { useState } from 'react'
import useGetUser from '../../../hooks/user/useGetUser'
import styles from './ImageEditor.module.scss'
import { ChevronDown } from 'lucide-react'
import FileInput from '../../../components/UI/Input/FileInput/FileInput'
import Form from '../../../components/UI/Form/Form'
import { useForm } from 'react-hook-form'
import { TUserImageData } from '../../../types/user.types'
import useEditUserImage from '../../../hooks/user/useEditUserImage'

const ImageEditor = () => {
  const currentUser = useGetUser()
  const editUserImage = useEditUserImage()

  const [isOpen, setIsOpen] = useState(false)

  const { handleSubmit, formState: { errors }, register, setValue } = useForm<TUserImageData>()
  const onSubmit = (data: TUserImageData) => {
    editUserImage({
      id: Number(currentUser?.id),
      ...data
    })
    setIsOpen(false)
  }

  return (
    <div className={`${styles.wrapper}${isOpen ? ' ' + styles.open : ''}`}>
      <h2 className={styles.title}>Изменить аватар <ChevronDown className={styles.toggle} onClick={() => setIsOpen(prev => !prev)} /></h2>
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
          <FileInput
            register={register('image', {
              required: true
            })}
            label='Новый аватар'
            setValue={setValue}
            fieldName='image'
            error={errors.image}
            classes={{
              block: styles.block
            }}
          />
        </Form>
        <button className={`btn ${styles.confirm_btn}`} onClick={() => setIsOpen(true)}>Изменить</button>
      </div>
    </div>
  )
}

export default ImageEditor