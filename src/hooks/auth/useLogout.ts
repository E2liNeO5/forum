import { useNavigate } from "react-router"
import useActions from "../useActions"
import { useLocation } from "react-router"

const useLogout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { removeUser } = useActions()

  return () => {
    removeUser()
    if(location.pathname === '/')
      navigate(0)
    else
      navigate('/')
  }
}

export default useLogout