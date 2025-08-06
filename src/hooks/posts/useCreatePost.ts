import { useNavigate } from "react-router"
import { useCreatePostMutation } from "../../store/api/post.api"
import { TCreatePost, TPostData } from "../../types/post.types"
import { getCurrentDate, handleError } from "../../utils"
import useActions from "../useActions"
import useGetUser from "../user/useGetUser"
import { TCustomError } from "../../types/global.types"

const useCreatePost = () => {
  const user = useGetUser()
  const [mutate] = useCreatePostMutation()
  const navigate = useNavigate()

  const { addToast } = useActions()

  const createPost = async (data: TCreatePost) => {
      var img = new Image
      img.src = URL.createObjectURL(data.image[0])
      img.onload = async () => {
        try {
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
          handleError(response.error as TCustomError)
          
          if(response.data)
            navigate(`/post/${response.data.id}`)
        } catch (e: any) {
          addToast({
            text: e.message,
            type: 'error'
          })
        }
      }
  }

  return createPost
}

export default useCreatePost