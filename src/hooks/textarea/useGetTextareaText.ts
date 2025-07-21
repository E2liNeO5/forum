import { useAppSelector } from "../typedHooks"

const useGetTextareaText = () => {
  return useAppSelector(state => state.textarea).text
}

export default useGetTextareaText