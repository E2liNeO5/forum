import { useSignUpMutation } from "../../store/api/user.api"
import { TAuthData } from "../../types/user.types"
import { useNavigate } from "react-router"
import useActions from "../useActions"

const useSignUp = () => {
  const navigate = useNavigate()
  const [mutate] = useSignUpMutation()
  const { addToast } = useActions()

  const signIn = async (data: TAuthData) => {
    const response = await mutate(data)
    if(response.error && 'data' in response.error)
      addToast({ id: Date.now(), text: response.error && response.error.data.message, type: 'error' })
    else
      navigate('/signIn')
  }

  return signIn
}

export default useSignUp