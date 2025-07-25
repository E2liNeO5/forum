import { useGetAllUsersQuery } from "../../store/api/user.api"
import { TCustomError } from "../../types/global.types"

const useGetAllUsers = () => {
  const response = useGetAllUsersQuery(null)

  return {
    isLoading: response.isLoading,
    error: (response.error as TCustomError)?.data,
    users: response.data
  }
}

export default useGetAllUsers