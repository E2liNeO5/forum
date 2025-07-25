import { useSignUpMutation } from "../../store/api/user.api"
import { TSignUpData } from "../../types/user.types"
import { useNavigate } from "react-router"
import useActions from "../useActions"
import { handleError } from "../../utils"

const useSignUp = () => {
  const navigate = useNavigate()
  const [mutate] = useSignUpMutation()
  const { addToast } = useActions()

  const signIn = async (data: TSignUpData) => {
    try {
      const response = await mutate(data)
      handleError(response.error)
    
      navigate('/signIn')
    } catch (e: any) {
      addToast({
        text: e.message,
        type: 'error'
      })
    }
  }

  return signIn
}

export default useSignUp