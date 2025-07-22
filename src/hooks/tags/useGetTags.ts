import { useGetTagsQuery } from "../../store/api/tag.api"
import { TCustomError } from "../../types/global.types"

const useGetTags = () => {
  const response = useGetTagsQuery(null)

  return {
    isLoading: response.isLoading,
    tags: response.data,
    error: (response.error as TCustomError)?.data 
  }
}

export default useGetTags