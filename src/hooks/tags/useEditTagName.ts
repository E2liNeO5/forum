import { useEditTagNameMutation } from "../../store/api/tag.api"
import { TTag } from "../../types/tag.types"
import useActions from "../useActions"

const useEditTagName = () => {
  const [mutate] = useEditTagNameMutation()
  const { addToast } = useActions()

  const editTagName = async (data: TTag) => {
    try {
      const result = await mutate(data)
      if(result.error && 'data' in result.error)
        addToast({
          text: result.error.data.message,
          type: 'error'
        })
      else
        addToast({
          text: 'Тэг успешно обновлён',
          type: 'success'
        })
      return result
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  return editTagName
}

export default useEditTagName