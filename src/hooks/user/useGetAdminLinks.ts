import { ADMIN_LINKS } from "../../constants"
import useGetUser from "./useGetUser"

const useGetAdminLinks = () => {
  const user = useGetUser()
  return user && user.role === 'admin' ? ADMIN_LINKS : [] 
}

export default useGetAdminLinks