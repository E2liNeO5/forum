import Loading from '../../components/UI/Loading/Loading'
import useCheckUserRole from '../../hooks/user/useCheckUserRole'
import ErrorPage from '../ErrorPage/ErrorPage'
import Reports from './Reports/Reports'

const ReportsPage = () => {
  const { isLoading, error, isAdmin } = useCheckUserRole()

  return (
    <>
      {
        isLoading ? <Loading /> : 
        error ? <ErrorPage text={error.message} /> :
        !isAdmin ? <ErrorPage text='Нет доступа' /> : 
        <Reports />
      }
    </>
  )
}
export default ReportsPage