import { ADMIN_LINKS, USER_LINKS } from "../../constants"
import useGetUser from "./useGetUser"

const useGetUserLinks = () => {
  const user = useGetUser()
  return user && user.role === 'admin' ? [...USER_LINKS, ...ADMIN_LINKS] : user ? USER_LINKS : []
}

export default useGetUserLinks