import styles from './TagSidebar.module.scss'
import { Tag } from '../../types/tag'
import { useAppSelector } from '../../hooks/typedHooks'
import { useCallback } from 'react'
import useActions from '../../hooks/useActions'

type Props = {
  item: Tag
}

const TagItem = ({ item }: Props) => {
  const { currentTags } = useAppSelector(state => state.tagsReducer)
  const { selectTag } = useActions()

  const clickHandler = () => {
    selectTag(item.id)
  }

  const setSelectedClass = useCallback(() => {
    return ` ${item.id === 0 && currentTags.length === 0 || currentTags.length > 0 && currentTags.includes(item.id) ? ` ${styles.selected}` : ''}`
  }, [currentTags])

  return (
    <div
      className={styles.tag_item + setSelectedClass()}
      onClick={clickHandler}
    >{item.name}</div>
  )
}

export default TagItem