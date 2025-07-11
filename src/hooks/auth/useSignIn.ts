import { useSignInMutation } from "../../store/api/user.api"
import { TAuthData } from "../../types/user.types"
import { useNavigate } from "react-router"
import useActions from "../useActions"

const useSignIn = () => {
  const navigate = useNavigate()
  const [mutate] = useSignInMutation()
  const { addToast, addUser } = useActions()

  const signIn = async (data: TAuthData) => {
    const response = await mutate(data)
    if(response.error && 'data' in response.error)
      addToast({ id: Date.now(), text: response.error && response.error.data.message, type: 'error' })
    else if(response.data) {
      addUser(response.data)
      navigate('/')
    }
  }

  return signIn
}

export default useSignIn