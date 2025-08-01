import { useGetReportsQuery } from "../../store/api/report.api"
import { TCustomError } from "../../types/global.types"

const useGetReports = () => {
  const response = useGetReportsQuery(null)

  return {
    isLoading: response.isLoading,
    error: (response.error as TCustomError)?.data,
    reports: response.data
  }
}

export default useGetReports