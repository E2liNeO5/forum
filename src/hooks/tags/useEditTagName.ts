import { useEditTagNameMutation } from "../../store/api/tag.api"
import { TCustomError } from "../../types/global.types"
import { TTag } from "../../types/tag.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useEditTagName = () => {
  const [mutate] = useEditTagNameMutation()
  const { addToast } = useActions()

  const editTagName = async (data: TTag) => {
    try {
      const result = await mutate(data)
      handleError(result.error as TCustomError)
      addToast({
        text: 'Тэг успешно обновлён',
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

  return editTagName
}

export default useEditTagName