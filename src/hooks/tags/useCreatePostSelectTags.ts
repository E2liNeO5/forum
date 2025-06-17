import { useAppSelector } from "../typedHooks"

const useCreatePostSelectTags = () => {
  return useAppSelector(state => state.tags).createPost
}

export default useCreatePostSelectTags