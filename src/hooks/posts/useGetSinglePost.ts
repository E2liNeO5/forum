import { useGetSinglePostQuery } from "../../store/api/post.api"
import { TCustomError } from "../../types/global.types"

const useGetSinglePost = (postId: number) => {
  const data = useGetSinglePostQuery(postId)
  return { isLoading: data.isLoading, error: (data.error as TCustomError)?.data, post: data.data }
}

export default useGetSinglePost