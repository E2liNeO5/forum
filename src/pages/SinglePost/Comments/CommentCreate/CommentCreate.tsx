import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './CommentCreate.module.scss'
import { Dispatch, SetStateAction } from 'react'
import { TCommentData, TCommentItem } from '../../../../types/comment.types'
import useActions from '../../../../hooks/useActions'
import useCreateComment from '../../../../hooks/posts/useCreateComment'
import useCheckUserRole from '../../../../hooks/user/useCheckUserRole'
import Loading from '../../../../components/UI/Loading/Loading'
import Textarea from '../../../../components/UI/Textarea/Textarea'
import Form from '../../../../components/UI/Form/Form'

type Props = {
  postId: number
  setLoadedComments: Dispatch<SetStateAction<TCommentItem[]>>
}

const CommentCreate = ({ postId, setLoadedComments }: Props) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TCommentData>()
  const { resetTextarea } = useActions()
  const createComment = useCreateComment()

  const { isLoading, error, role, banReason } = useCheckUserRole()

  const onSubmit: SubmitHandler<TCommentData> = async (data: TCommentData) => {
    createComment(data, postId)
      .then(result => {
        if(result)
          setLoadedComments(prev => ([result, ...prev]))
      })
      .finally(() => {
        resetTextarea()
      })
  }

  return (
    <Form
      button={role === 'banned' ? '' : 'Отправить'}
      onSubmit={handleSubmit(onSubmit)}
      classes={{
        wrapper: styles.form_wrapper,
        form: styles.form,
        button: styles.form_btn
      }}
    >
      {
        isLoading ? <Loading /> :
        error ? <h3>{ error.message }</h3> :
        role === 'banned' ? <h3>Вы не можете писать по причине: { banReason }</h3> :
        <Textarea
          register={register('text', { required: true })}
          error={errors.text}
          fieldName='text'
          setValue={setValue}
          classes={{
            wrapper: styles.textarea_wrapper
          }}
        />
      }
    </Form>
  )
}

export default CommentCreate