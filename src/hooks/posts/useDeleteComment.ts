import { useDeleteCommentMutation } from "../../store/api/post.api"
import { TCustomError } from "../../types/global.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useDeleteComment = () => {
  const [mutate] = useDeleteCommentMutation()

  const { addToast } = useActions()

  return async (commentId: number) => {
    try {
      const response = await mutate(commentId)
      handleError(response.error as TCustomError)
      addToast({
        text: 'Комментарий успешно удалён',
        type: 'success'
      })
    } catch (e: any) {
      addToast({
        text: e.message,
        type: 'error'
      })
    }
  }
}

export default useDeleteComment