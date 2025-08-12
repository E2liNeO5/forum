import { useEditUserImageMutation } from "../../store/api/user.api"
import { TCustomError } from "../../types/global.types"
import { TEditImageData } from "../../types/user.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useEditUserImage = () => {
  const [mutate] = useEditUserImageMutation()
  const { addToast, addUser } = useActions()

  return async (data: TEditImageData) => {
    try {
      const response = await mutate(data)
      handleError(response.error as TCustomError)

      if(response.data) {
        addUser(response.data)
        addToast({
          text: 'Аватар успешно изменён',
          type: 'success'
        })
      }

    } catch (e: any) {
      addToast({
        text: e.message,
        type: 'error'
      })
    }
  }
}

export default useEditUserImage