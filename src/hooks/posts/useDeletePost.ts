import { useNavigate } from "react-router"
import { useDeletePostMutation } from "../../store/api/post.api"
import { TCustomError } from "../../types/global.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useDeletePost = () => {
  const [mutate] = useDeletePostMutation()

  const { addToast } = useActions()
  const navigate = useNavigate()

  return async (postId: number) => {
    try {
      const response = await mutate(postId)
      handleError(response.error as TCustomError)
      addToast({
        text: 'Пост успешно удалён',
        type: 'success'
      })
      navigate('/')
    } catch (e: any) {
      addToast({
        text: e.message,
        type: 'error'
      })
    }
  }
}

export default useDeletePost