import { SubmitHandler, useForm } from 'react-hook-form'
import Form from '../../UI/Form/Form'
import Textarea from '../../UI/Textarea/Textarea'
import styles from './CommentCreate.module.scss'
import { TCommentData } from '../../../types/comment.types'
import useCreateComment from '../../../hooks/posts/useCreateComment'
import useTextareaReset from '../../../hooks/textarea/useTextareaReset'

type Props = {
  postId: number
}

const CommentCreate = ({ postId }: Props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TCommentData>()
  const { reset, isReset } = useTextareaReset()
  const createComment = useCreateComment()

  const onSubmit: SubmitHandler<TCommentData> = async (data: TCommentData) => {
    createComment(data, postId)
    reset()
  }

  return (
    <Form
      button='Отправить'
      onSubmit={handleSubmit(onSubmit)}
      classes={{
        wrapper: styles.form_wrapper,
        form: styles.form,
        button: styles.form_btn
      }}
    >
      <Textarea
        register={register('text', { required: true })}
        error={errors.text}
        fieldName='text'
        setValue={setValue}
        classes={{
          wrapper: styles.textarea_wrapper
        }}
        isReset={isReset}
      />
    </Form>
  )
}

export default CommentCreate