import { CircleArrowLeft } from 'lucide-react'
import styles from './FilterSidebar.module.scss'
import { useState } from 'react'

const FilterSidebar = () => {
  const [closed, setClosed] = useState(true)
  
  const visibleToggle = () => {
    setClosed(prev => !prev)
  }

  return (
    <div className={styles.sidebar + (closed ? ` ${styles.closed}` : '')}>
      <div className={styles.visible_toggle} onClick={visibleToggle}>
        <CircleArrowLeft size={50} color='#fff' />
      </div>
      <div className={styles.filters}>
        <div className={styles.filter_item}>Тема1</div>
        <div className={styles.filter_item}>Тема2</div>
        <div className={styles.filter_item}>Тема3</div>
        <div className={styles.filter_item}>Тема4</div>
      </div>
    </div>
  )
}

export default FilterSidebar