import Loading from '../../../components/UI/Loading/Loading'
import useGetReports from '../../../hooks/reports/useGetReports'
import ErrorPage from '../../ErrorPage/ErrorPage'
import ReportItem from '../ReportItem/ReportItem'
import styles from './Reports.module.scss'

const Reports = () => {
  const { isLoading, error, reports } = useGetReports()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Жалобы:</h2>
      {
        isLoading ? <Loading /> :
        error ? <ErrorPage text={error.message} /> :
        !reports || reports.length === 0 ? <ErrorPage text='Жалоб нет' /> :
        reports.map(report => <ReportItem key={report.id} item={report} user={report.user} />)
      }
    </div>
  )
}

export default Reports