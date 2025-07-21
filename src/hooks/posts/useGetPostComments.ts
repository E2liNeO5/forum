import { useGetPostCommentsQuery } from "../../store/api/post.api"
import { TCustomError } from "../../types/global.types"

const useGetPostComments = (postId: number, page: number) => {
  const response = useGetPostCommentsQuery({ postId, page })

  return {
    isLoading: response.isLoading,
    comments: response.data?.commentsOnPage,
    maxComments: response.data?.maxComments,
    error: (response.error as TCustomError)?.data
  }
}

export default useGetPostComments