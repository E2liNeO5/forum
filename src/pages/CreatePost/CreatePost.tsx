import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../components/UI/Input/Input'
import useGetUser from '../../hooks/user/useGetUser'
import ErrorPage from '../ErrorPage/ErrorPage'
import styles from './CreatePost.module.scss'
import { TCreatePost } from '../../types/post'
import Form from '../../components/UI/Form/Form'
import TagsSelect from '../../components/UI/TagsSelect/TagsSelect'
import useCreatePost from '../../hooks/posts/useCreatePost'
import { useEffect } from 'react'
import useActions from '../../hooks/useActions'
import FileInput from '../../components/UI/Input/FileInput/FileInput'
import Textarea from '../../components/UI/Textarea/Textarea'

const CreatePost = () => {
  const user = useGetUser()
  const createPost = useCreatePost()

  const { clearCreatePostTags } = useActions()

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<TCreatePost>()
  const onSubmit: SubmitHandler<TCreatePost> = async(data: TCreatePost) => createPost(data)

  useEffect(() => {
    return () => { clearCreatePostTags() }
  }, [])

  return (
    <>
      {
        user ?
        (
          <Form button='Создать' onSubmit={handleSubmit(onSubmit)} extraClass={styles.post_form}>
            <div className={styles.split_fields}>
              <Input
                classes={{
                  block: styles.post_block
                }}
                label='Название'
                type='text'
                error={errors.title}
                register={register('title', {
                  required: true
                })}
              />
              <FileInput
                classes={{
                  block: styles.post_block
                }}
                label='Изображение'
                error={errors.image}
                register={register('image', {
                  required: true
                })}
                setValue={setValue}
              />
            </div>
            
            <Textarea
              register={register('text', { required: true })}
              error={errors.text}
              setValue={setValue} // Хз как решить эту проблемы с дженериками, пока оставить так
              fieldName='text'
            />

            <Controller
                name='tags'
                rules={{ required: true }}
                control={control}
                render={
                  ({ field: { onChange }, fieldState: { error } }) => (
                    <TagsSelect
                      error={error}
                      onChange={onChange}
                    />
                  )
                }
              />
          </Form>
        ) :
        (
          <ErrorPage text='Нужно войти в аккаунт' />
        )
      }
    </>
  )
}

export default CreatePost