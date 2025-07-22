import Loading from '../../../components/UI/Loading/Loading'
import useGetTags from '../../../hooks/tags/useGetTags'
import ErrorPage from '../../ErrorPage/ErrorPage'
import TagItem from '../TagItem/TagItem'
import styles from './ExistTags.module.scss'

const ExistTags = () => {
  const { isLoading, tags, error } = useGetTags()

  return (
    <div className={styles.container}>
      {
        isLoading ? <Loading /> :
        error ? <ErrorPage text={error.message} /> :
        !tags || tags.length === 0 ? <h3>Тэги не найдены</h3> :
        tags.map(tag => <TagItem key={tag.id} id={tag.id} name={tag.name} />)
      }
    </div>
  )
}

export default ExistTags