import { useAppSelector } from "../typedHooks"

const useGetPosts = () => {
  const posts = useAppSelector(state => state.postsReducer)
  const { currentTags } = useAppSelector(state => state.tagsReducer)

  return currentTags.length === 0 ? posts : posts.filter(post => {
    const tags = post.tags.reduce<number[]>((acc: number[], tagId: number) => {
      if(currentTags.includes(tagId))
        acc.push(tagId)
    return acc
    }, [])

    if(tags.length > 0)
      return true
  })
}

export default useGetPosts