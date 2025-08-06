import { useCreateReportMutation } from "../../store/api/report.api"
import { TCustomError } from "../../types/global.types"
import { TReportData } from "../../types/report.types"
import { handleError } from "../../utils"
import useActions from "../useActions"

const useCreateReport = () => {
  const [mutate] = useCreateReportMutation()
  const { addToast } = useActions()

  return async (data: TReportData) => {
    try {
      const response = await mutate(data)
      handleError(response.error as TCustomError)
      addToast({
        text: 'Жалоба отправлена',
        type: 'success'
      })
    } catch (e: any) {
      addToast({
        text: e.message,
        type: 'error'
      })
    }
  }
}

export default useCreateReport