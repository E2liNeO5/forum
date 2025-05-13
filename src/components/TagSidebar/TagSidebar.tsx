import { CircleArrowLeft } from 'lucide-react'
import styles from './TagSidebar.module.scss'
import { useMemo, useState } from 'react'
import TagItem from './TagItem'
import useGetTags from '../../hooks/tags/useGetTags'

const TagSidebar = () => {
  const [closed, setClosed] = useState(true)

  const tags = useGetTags()

  const memorizedTags = useMemo(() => {
    return [{
        id: 0,
        name: 'Все'
      }, ...tags
    ].map(item => <TagItem key={item.id} item={item} />)
  }, [])
  
  const visibleToggle = () => {
    setClosed(prev => !prev)
  }

  return (
    <div className={styles.sidebar + (closed ? ` ${styles.closed}` : '')}>
      <div className={styles.visible_toggle} onClick={visibleToggle}>
        <CircleArrowLeft size={50} color='#fff' />
      </div>
      <div className={styles.tags}>
        { memorizedTags }
      </div>
    </div>
  )
}

export default TagSidebar