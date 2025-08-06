import { useDeleteReportMutation } from "../../store/api/report.api"
import { TCustomError } from "../../types/global.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useDeleteReport = () => {
  const [mutate] = useDeleteReportMutation()
  const { addToast } = useActions()

  const deleteReport = async (id: number) => {
    try {
      const response = await mutate(id)
      handleError(response.error as TCustomError)

      addToast({
        text: 'Жалоба успешно удалена',
        type: 'success'
      })
    } catch (e: any) {
      addToast({
        text: e.message,
        type: 'error'
      })
    }
  }

  return deleteReport
}

export default useDeleteReport