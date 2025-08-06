import Loading from '../../../components/UI/Loading/Loading'
import useGetTags from '../../../hooks/tags/useGetTags'
import ErrorPage from '../../ErrorPage/ErrorPage'
import SearchItems from '../../../components/UI/SearchItems/SearchItems'
import TagItem from '../TagItem/TagItem'
import styles from './ExistTags.module.scss'
import { useEffect, useState } from 'react'

const ExistTags = () => {
  const { isLoading, tags, error } = useGetTags()
  const [existedTags, setExistedTags] = useState(tags || [])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if(tags)
      setExistedTags(tags.filter(tag => tag.name.toLowerCase().indexOf(search) >= 0))
  }, [tags, search])

  return (
    <>
      <SearchItems setSearch={setSearch} />
      <div className={styles.container}>
        {
          isLoading ? <Loading /> :
          error ? <ErrorPage text={error.message} /> :
          !tags || tags.length === 0 ? <h3 className='data_is_not_found'>Тэги не найдены</h3> :
          existedTags.map(tag => <TagItem key={tag.id} id={tag.id} name={tag.name} />)
        }
      </div>
    </>
  )
}

export default ExistTags