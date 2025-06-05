import { useAppSelector } from "../typedHooks"

const useGetUser = () => {
  const state = useAppSelector(state => state.user)
  return state.user
}

export default useGetUser