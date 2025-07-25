import { useGetUserRoleQuery } from "../../store/api/user.api"
import { TCustomError } from "../../types/global.types"
import useGetUser from "./useGetUser"

const useCheckUserRole = () => {
  const currentUser = useGetUser()

  if(currentUser) {
    const response = useGetUserRoleQuery(currentUser.id)

    return {
      isLoading: response.isLoading,
      error: (response.error as TCustomError)?.data,
      isAdmin: response.data?.role === 'admin',
      role: response.data?.role,
      banReason: response.data?.banReason
    }
  } else
    return {
      error: { message: 'Нужно войти в аккаунт' }
    }
}

export default useCheckUserRole