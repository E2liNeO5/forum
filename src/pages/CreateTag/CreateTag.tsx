import { SubmitHandler, useForm } from 'react-hook-form'
import Form from '../../components/UI/Form/Form'
import styles from './CreateTag.module.scss'
import { TTagData } from '../../types/tag.types'
import Input from '../../components/UI/Input/Input'
import useCreateTag from '../../hooks/tags/useCreateTag'
import ExistTags from './ExistTags/ExistTags'
import useCheckUserRole from '../../hooks/user/useCheckUserRole'
import Loading from '../../components/UI/Loading/Loading'
import ErrorPage from '../ErrorPage/ErrorPage'

const CreateTag = () => {
  const { isLoading, error, isAdmin } = useCheckUserRole()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TTagData>()
  const createTag = useCreateTag()
  
  const onSubmit: SubmitHandler<TTagData> = (data: TTagData) => {
    createTag(data)
      .finally(reset)
  }

  return (
    <>
      {
        isLoading ? <Loading /> :
        error ? <ErrorPage text={error.message} /> :
        !isAdmin ? <ErrorPage text='Нет доступа' /> :
        <div className={styles.container}>
          <Form
            button='Создать'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type='text'
              label='Название тэга'
              error={errors.name}
              register={register('name', { required: true })}
            />
          </Form>
          <ExistTags />
        </div>
      }
    </>
  )
}

export default CreateTag