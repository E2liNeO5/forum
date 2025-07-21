import { useCreateCommentMutation } from "../../store/api/post.api"
import { TCommentData } from "../../types/comment.types"
import { getCurrentDate } from "../../utils"
import useActions from "../useActions"
import useGetUser from "../user/useGetUser"

const useCreateComment = () => {
  const [mutate] = useCreateCommentMutation()
  const { addToast } = useActions()

  const user = useGetUser()

  const createComment = async (data: TCommentData, postId: number) => {
    try {
      const addressees = data.text.match(/<@[0-9]\|\D[^>]+>/g) //<@id|login>
      addressees?.forEach(address => {
        const addressData = address.split('|')
        const id = addressData[0].replace('<@', '')
        const login = addressData[1].replace('>', '')
        data.text = data.text.replace(address, `{\"id\":${id}, \"login\": \"${login}\"}`)
      })

      const date = getCurrentDate()
      const response = await mutate({
        ...data,
        date,
        authorId: user?.id || 0,
        postId
      })
      if(response.error && 'data' in response.error) {
        addToast({
          id: Date.now(),
          text: response.error.data.message,
          type: 'error'
        })
        throw new Error(response.error.data.message)
      }
      return response.data
    } catch (e: any) {
      throw new Error(e)
    }
  }

  return createComment
}

export default useCreateComment