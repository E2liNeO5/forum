import { useGetPostsQuery } from "../../store/api/post.api"
import { TCustomError } from "../../types/global"
import { useAppSelector } from "../typedHooks"

const useGetPosts = (page: number) => {
  const response = useGetPostsQuery(page)
  const { currentTags } = useAppSelector(state => state.tags)

  const postsOnPage = currentTags.length === 0 ? response.data?.postsOnPage || [] : response.data?.postsOnPage.filter(post => {
    const tags = post.tags.reduce<number[]>((acc: number[], tagId: number) => {
      if(currentTags.includes(tagId))
        acc.push(tagId)
    return acc
    }, [])

    if(tags.length > 0)
      return true
  })

  return { isLoading: response.isLoading, error: (response.error as TCustomError)?.data, posts: postsOnPage, maxPostsCount: response.data?.maxPostsCount }
}

export default useGetPosts