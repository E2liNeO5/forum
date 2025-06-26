import { useGetPostsQuery } from "../../store/api/post.api"
import { CustomError } from "../../types/global"
import { useAppSelector } from "../typedHooks"

const useGetPosts = (page: number) => {
  const posts = useGetPostsQuery(page)
  const { currentTags } = useAppSelector(state => state.tags)

  const postsOnPage = currentTags.length === 0 ? posts.data || [] : posts.data?.filter(post => {
    const tags = post.tags.reduce<number[]>((acc: number[], tagId: number) => {
      if(currentTags.includes(tagId))
        acc.push(tagId)
    return acc
    }, [])

    if(tags.length > 0)
      return true
  })

  return { isLoading: posts.isLoading, error: (posts.error as CustomError)?.data, posts: postsOnPage }
}

export default useGetPosts