import { CircleArrowLeft } from 'lucide-react'
import styles from './TagSidebar.module.scss'
import { useState } from 'react'
import TagItem from './TagItem'
import useGetTags from '../../hooks/tags/useGetTags'
import Loading from '../UI/Loading/Loading'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'

const TagSidebar = () => {
  const [closed, setClosed] = useState(true)
  const { isLoading, tags, error } = useGetTags()
  
  const visibleToggle = () => {
    setClosed(prev => !prev)
  }

  return (
    <div className={styles.sidebar + (closed ? ` ${styles.closed}` : '')}>
      <div className={styles.visible_toggle} onClick={visibleToggle}>
        <CircleArrowLeft size={50} color='#fff' />
      </div>
      <div className={styles.tags}>
        { 
          isLoading ? <Loading /> : 
          error ? <ErrorPage text={error.message} /> :
          !tags || tags.length === 0 ? <h3 className='data_is_not_found'>Тэги не найдены</h3> :
          <>
            <TagItem item={{
              id: 0,
              name: 'Все'
            }} />
            { tags.map(tag => <TagItem key={tag.id} item={tag} />) }
          </>
        }
      </div>
    </div>
  )
}

export default TagSidebar