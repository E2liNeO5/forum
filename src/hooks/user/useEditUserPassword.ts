import { useEditUserPasswordMutation } from "../../store/api/user.api"
import { TCustomError } from "../../types/global.types"
import { TEditPasswordData } from "../../types/user.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useEditUserPassword = () => {
  const [mutate] = useEditUserPasswordMutation()
  const { addToast, addUser } = useActions()

  return async (data: TEditPasswordData) => {
    try {
      const response = await mutate(data)
      handleError(response.error as TCustomError)

      if(response.data) {
        addUser(response.data)
        addToast({
          text: 'Пароль успешно изменён',
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

export default useEditUserPassword