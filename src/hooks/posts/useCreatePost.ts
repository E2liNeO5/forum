import { useNavigate } from "react-router"
import { useCreatePostMutation } from "../../store/api/post.api"
import { TCreatePost, TPostData } from "../../types/post"
import { getCurrentDate } from "../../utils"
import useActions from "../useActions"
import useGetUser from "../user/useGetUser"

const useCreatePost = () => {
  const user = useGetUser()
  const [mutate] = useCreatePostMutation()
  const navigate = useNavigate()

  const { addToast } = useActions()

  const createPost = async (data: TCreatePost) => {
    var img = new Image
    img.src = URL.createObjectURL(data.image[0])
    img.onload = async () => {
      const post: TPostData = {
        title: data.title,
        text: data.text,
        authorId: user ? +user.id : 0,
        tags: data.tags,
        date: getCurrentDate(),
        image: data.image,
        imageSize: img.height > img.width ? 'height' : 'width'
      }
      const response = await mutate(post)
      if(response.error && 'data' in response.error)
        addToast({ id: Date.now(), text: response.error && response.error.data.message, type: 'error' })
      else if(response.data)
        navigate(`/post/${response.data.id}`)
    }
  }

  return createPost
}

export default useCreatePost