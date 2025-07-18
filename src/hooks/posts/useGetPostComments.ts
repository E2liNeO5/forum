import { useGetPostCommentsQuery } from "../../store/api/post.api"
import { TCustomError } from "../../types/global.types"

const useGetPostComments = (postId: number) => {
  const response = useGetPostCommentsQuery(postId)

  return { isLoading: response.isLoading, comments: response.data, error: (response.error as TCustomError)?.data }
}

export default useGetPostComments