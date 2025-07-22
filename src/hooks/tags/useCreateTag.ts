import { useCreateTagMutation } from "../../store/api/tag.api"
import { TTagData } from "../../types/tag.types"
import useActions from "../useActions"

const useCreateTag = () => {
  const [mutate] = useCreateTagMutation()
  const { addToast } = useActions()

  const createTag = async (data: TTagData) => {
    try {
      const result = await mutate(data)
      if(result.error && 'data' in result.error)
        addToast({
          id: Date.now(),
          text: result.error.data.message,
          type: 'error'
        })
      else
        addToast({
          id: Date.now(),
          text: 'Тэг успешно добавлен',
          type: 'success'
        })
      return result
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  return createTag
}

export default useCreateTag