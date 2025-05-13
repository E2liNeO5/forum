import { useAppSelector } from "../typedHooks"

const useGetTags = () => {
  return useAppSelector(state => state.tagsReducer).tags
}

export default useGetTags