import { useGetUserPostsQuery } from "../../store/api/user.api"
import { TCustomError } from "../../types/global.types"

const useGetUserPosts = (id: number) => {
  const response = useGetUserPostsQuery(id)
  return { isLoading: response.isLoading, error: (response.error as TCustomError)?.data, posts: response.data }
}

export default useGetUserPosts