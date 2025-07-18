import { useCreateCommentMutation } from "../../store/api/post.api"
import { TCommentData } from "../../types/comment.types"
import { getCurrentDate } from "../../utils"
import useActions from "../useActions"
import useGetUser from "../user/useGetUser"

const useCreateComment = () => {
  const [mutate] = useCreateCommentMutation()
  const { addToast } = useActions()

  const user = useGetUser()

  const createComment = async (data: TCommentData, postId: number) => {
    const date = getCurrentDate()
    const response = await mutate({
      ...data,
      date,
      authorId: user?.id || 0,
      postId
    })
    if(response.error && 'data' in response.error)
      addToast({
        id: Date.now(),
        text: response.error && response.error.data.message,
        type: 'error'
      })
  }

  return createComment
}

export default useCreateComment