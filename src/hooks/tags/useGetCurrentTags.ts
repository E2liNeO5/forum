import { useAppSelector } from "../typedHooks"

const useGetCurrentTags = () => {
  return useAppSelector(state => state.tags).currentTags
}

export default useGetCurrentTags