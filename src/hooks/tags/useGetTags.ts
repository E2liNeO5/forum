import { useAppSelector } from "../typedHooks"

const useGetTags = () => {
  return useAppSelector(state => state.tags).tags
}

export default useGetTags