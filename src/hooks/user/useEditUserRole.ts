import { useEditUserRoleMutation } from "../../store/api/user.api"
import { TCustomError } from "../../types/global.types"
import { TEditUserRole } from "../../types/user.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useEditUserRole = () => {
  const [mutate] = useEditUserRoleMutation()
  const { addToast } = useActions()

  const editUserRole = async (data: TEditUserRole, userName: string) => {
    try {
      const response = await mutate(data)

      handleError(response.error as TCustomError)

      addToast({ text: `Роль у пользователя "${userName}" успешно изменена`, type: 'success' })

      return response.data
    } catch (e: any) {
      addToast({ text: e.message, type: 'error' })
    }
  }

  return editUserRole
}

export default useEditUserRole