import { useEditUserLoginMutation } from "../../store/api/user.api"
import { TCustomError } from "../../types/global.types"
import { TEditLoginData } from "../../types/user.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useEditUserLogin = () => {
  const [mutate] = useEditUserLoginMutation()
  const { addToast, addUser } = useActions()

  return async (data: TEditLoginData) => {
    try {
      const response = await mutate(data)
      handleError(response.error as TCustomError)

      if(response.data) {
        addUser(response.data)
        addToast({
          text: 'Логин успешно изменён',
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

export default useEditUserLogin