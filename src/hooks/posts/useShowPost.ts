import { useNavigate } from "react-router"

const useShowPost = () => {
  const navigate = useNavigate()

  return (id: number) => navigate(`/post/${id}`)
}

export default useShowPost