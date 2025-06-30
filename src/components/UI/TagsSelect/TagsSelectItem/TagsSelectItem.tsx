import { Plus, X } from 'lucide-react'
import { TTagsSelectItem } from '../../../../types/global'
import styles from './TagsSelectItem.module.scss'
import useAnimation from '../../../../hooks/useAnimation'
import { useState } from 'react'
import useActions from '../../../../hooks/useActions'

type Props = {
  item: TTagsSelectItem
  type: 'add' | 'remove'
}

const TagsSelectItem = ({ item, type }: Props) => {
  const { createPostAddTag, createPostRemoveTag } = useActions()

  const animate = useAnimation()
  
  const [animateClass, setAnimateClass] = useState('')

  const addHandler = () => {
      animate({
        value: styles.fadeOut,
        defaultValue: '',
        setter: setAnimateClass,
        duration: 250,
        ending: () => createPostAddTag(item)
      })
    }

  const removeHandler = () => {
    animate({
      value: styles.fadeOut,
      defaultValue: '',
      setter: setAnimateClass,
      duration: 250,
      ending: () => createPostRemoveTag(item)
    })
  }

  return (
    <div className={`${styles.container}${animateClass ? ' ' + animateClass : ''}`}>
      {item.name}
      { type === 'add' ? 
        <Plus size={14} className={styles.btn} onClick={addHandler} /> : 
        <X size={14} className={styles.btn} onClick={removeHandler} />
      }
    </div>
  )
}

export default TagsSelectItem