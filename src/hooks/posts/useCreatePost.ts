import { useNavigate } from "react-router"
import { useCreatePostMutation } from "../../store/api/post.api"
import { CreatePostType, PostDataType } from "../../types/post"
import { getCurrentDate } from "../../utils"
import useActions from "../useActions"
import useGetUser from "../user/useGetUser"

const useCreatePost = () => {
  const user = useGetUser()
  const [mutate] = useCreatePostMutation()
  const navigate = useNavigate()

  const { addToast } = useActions()

  const createPost = async (data: CreatePostType) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('text', data.text)
    formData.append('authorId', user ? user.id.toString() : '')
    formData.append('tags', JSON.stringify(data.tags))
    formData.append('date', getCurrentDate())
    var img = new Image
    img.src = URL.createObjectURL(data.image[0])
    img.onload = () => {
      formData.append('image', data.image[0])
      formData.append('imageSize', img.height > img.width ? 'height' : 'width')
    }

    const post: PostDataType = {
      title: data.title,
      text: data.text,
      authorId: user ? user.id : 0,
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

  return createPost
}

export default useCreatePost