import { useGetUserByIdQuery } from "../../store/api/user.api"
import { TCustomError } from "../../types/global.types"

const useGetUserById = (id: number) => {
  const response = useGetUserByIdQuery(id)
  return { isLoading: response.isLoading, error: (response.error as TCustomError)?.data, user: response.data }
}

export default useGetUserById