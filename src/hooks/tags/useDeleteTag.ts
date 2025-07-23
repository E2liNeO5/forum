import { useDeleteTagMutation } from "../../store/api/tag.api"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useDeleteTag = () => {
  const [mutate] = useDeleteTagMutation()
  const { addToast } = useActions()

  const deleteTag = async (id: number) => {
    try {
      const response = await mutate(id)
      handleError(response.error)

      addToast({
        text: 'Тэг успешно удалён',
        type: 'success'
      })
    } catch (e: any) {
      addToast({
        text: e.message,
        type: 'error'
      })
    }
  }

  return deleteTag
}

export default useDeleteTag