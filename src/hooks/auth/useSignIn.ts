import { useSignInMutation } from "../../store/api/user.api"
import { AuthData } from "../../types/user"
import { useNavigate } from "react-router"
import useActions from "../useActions"
import { localStorageSet } from "../../utils"
import { USER_KEY } from "../../constants"

const useSignIn = () => {
  const navigate = useNavigate()
  const [mutate] = useSignInMutation()
  const { addToast } = useActions()

  const signIn = async (data: AuthData) => {
    const response = await mutate(data)
    if(response.error && 'data' in response.error)
      addToast({ id: Date.now(), text: response.error && response.error.data.message, type: 'error' })
    else {
      localStorageSet(USER_KEY, response.data)
      navigate('/')
    }
  }

  return signIn
}

export default useSignIn