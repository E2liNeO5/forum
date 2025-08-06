import { useEffect, useState } from 'react'
import Loading from '../../../components/UI/Loading/Loading'
import useGetReports from '../../../hooks/reports/useGetReports'
import { TReportItem } from '../../../types/report.types'
import ErrorPage from '../../ErrorPage/ErrorPage'
import ReportItem from '../ReportItem/ReportItem'
import styles from './Reports.module.scss'

const Reports = () => {
  const { isLoading, error, reports } = useGetReports()

  const [loadedReports, setLoadedReports] = useState<TReportItem[]>([])

  useEffect(() => {
    if(reports)
      setLoadedReports(reports)
  }, [reports])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Жалобы:</h2>
      {
        isLoading ? <Loading /> :
        error ? <ErrorPage text={error.message} /> :
        !reports || reports.length === 0 ? <ErrorPage text='Жалоб нет' /> :
        loadedReports.map(report => <ReportItem key={report.id} item={report} user={report.user} setReports={setLoadedReports} />)
      }
    </div>
  )
}

export default Reports