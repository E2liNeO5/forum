import { useBanUserMutation } from "../../store/api/user.api"
import { TUserBanData } from "../../types/user.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useBanUser = () => {
  const [mutate] = useBanUserMutation()
  const { addToast } = useActions()

  const banUser = async (data: TUserBanData, userName: string) => {
    try {
      const response = await mutate(data)

      handleError(response.error)

      addToast({
        text: `Пользователь "${userName}" забанен`,
        type: 'success'
      })

      return response.data
    } catch (e: any) {
      addToast({
        text: e.message,
        type: 'error'
      })
    }
  }

  return banUser
}

export default useBanUser