import { useCreateTagMutation } from "../../store/api/tag.api"
import { TTagData } from "../../types/tag.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useCreateTag = () => {
  const [mutate] = useCreateTagMutation()
  const { addToast } = useActions()

  const createTag = async (data: TTagData) => {
    try {
      const result = await mutate(data)
      handleError(result.error)

      addToast({
        text: 'Тэг успешно добавлен',
        type: 'success'
      })
      return result
    } catch (e: any) {
      addToast({
        text: e.message,
        type: 'error'
      })
    }
  }

  return createTag
}

export default useCreateTag