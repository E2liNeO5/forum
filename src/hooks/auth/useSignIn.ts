import { useSignInMutation } from "../../store/api/user.api"
import { TAuthData } from "../../types/user.types"
import { useNavigate } from "react-router"
import useActions from "../useActions"
import { handleError } from "../../utils"
import { TCustomError } from "../../types/global.types"

const useSignIn = () => {
  const navigate = useNavigate()
  const [mutate] = useSignInMutation()
  const { addToast, addUser } = useActions()

  const signIn = async (data: TAuthData) => {
    try {
      const response = await mutate(data)
      handleError(response.error as TCustomError)

      if(response.data) {
        addUser(response.data)
        navigate('/')
      }
    } catch (e: any) {
      addToast({
        text: e.message,
        type: 'error'
      })
    }
  }

  return signIn
}

export default useSignIn