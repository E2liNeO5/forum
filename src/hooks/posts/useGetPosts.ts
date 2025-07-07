import { useGetPostsQuery } from "../../store/api/post.api"
import { TCustomError } from "../../types/global.types"
import useGetCurrentTags from "../tags/useGetCurrentTags"

const useGetPosts = (page: number, search: string) => {
  const currentTags = useGetCurrentTags()
  const response = useGetPostsQuery({ page, search, tags: currentTags })

  return {
    isLoading: response.isLoading,
    error: (response.error as TCustomError)?.data,
    posts: response.data?.postsOnPage,
    maxPostsCount: response.data?.maxPostsCount
  }
}

export default useGetPosts