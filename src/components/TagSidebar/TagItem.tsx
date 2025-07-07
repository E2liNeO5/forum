import styles from './TagSidebar.module.scss'
import { TTag } from '../../types/tag.types'
import { useCallback } from 'react'
import useActions from '../../hooks/useActions'
import useGetCurrentTags from '../../hooks/tags/useGetCurrentTags'

type Props = {
  item: TTag
}

const TagItem = ({ item }: Props) => {
  const currentTags = useGetCurrentTags()
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