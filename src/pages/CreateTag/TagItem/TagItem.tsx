import { memo } from 'react'
import styles from './TagItem.module.scss'
import { Pencil, Trash } from 'lucide-react'

type Props = {
  id: number
  name: string
}

const TagItem = ({ id, name }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.tag_name}>{ name }</div>
      <div className={styles.buttons}>
        <button className={styles.green}><Pencil size={16} /></button>
        <button className={styles.red}><Trash size={16} /></button>
      </div>
    </div>
  )
}

export default memo(TagItem)