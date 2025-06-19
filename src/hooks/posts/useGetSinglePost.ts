import { useGetSinglePostQuery } from "../../store/api/post.api"
import { CustomError } from "../../types/global"

const useGetSinglePost = (postId: number) => {
  const data = useGetSinglePostQuery(postId)
  return { isLoading: data.isLoading, error: (data.error as CustomError)?.data, post: data.data }
}

export default useGetSinglePost