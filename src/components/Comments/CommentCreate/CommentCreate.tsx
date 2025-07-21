import { SubmitHandler, useForm } from 'react-hook-form'
import Form from '../../UI/Form/Form'
import Textarea from '../../UI/Textarea/Textarea'
import styles from './CommentCreate.module.scss'
import { TCommentData, TCommentItem } from '../../../types/comment.types'
import useCreateComment from '../../../hooks/posts/useCreateComment'
import useTextareaReset from '../../../hooks/textarea/useTextareaReset'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  postId: number
  setLoadedComments: Dispatch<SetStateAction<TCommentItem[]>>
}

const CommentCreate = ({ postId, setLoadedComments }: Props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TCommentData>()
  const { reset, isReset } = useTextareaReset()
  const createComment = useCreateComment()

  const onSubmit: SubmitHandler<TCommentData> = async (data: TCommentData) => {
    createComment(data, postId)
      .then(result => {
        console.log(result)
        if(result)
          setLoadedComments(prev => ([result, ...prev]))
      })
      .finally(() => {
        reset()
      })
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