import { FieldError } from 'react-hook-form'
import styles from './TagsSelect.module.scss'
import { useEffect } from 'react'
import TagsSelectItem from './TagsSelectItem/TagsSelectItem'
import TagsSelectSearch from './TagsSelectSearch/TagsSelectSearch'
import useCreatePostSelectTags from '../../../hooks/tags/useCreatePostSelectTags'

type Props = {
  error?: FieldError
  onChange: (...event: any[]) => void
}

const TagsSelect = ({ error, onChange }: Props) => {
  const selectedTags = useCreatePostSelectTags()

  useEffect(() => {
    onChange(selectedTags.map(tag => tag.id))
  }, [selectedTags])

  return (
    <div className={`${styles.tag_select_wrapper}${error ? ' ' + styles.invalid : ''}`}>
      <div className={`${styles.tags_select_title}${error ? ' ' + styles.invalid : ''}`}>Тэги</div>
      <div className={styles.tag_select_container}>
        <div className={styles.selected_tags_wrapper}>
          <div className={styles.selected_tags_container}>
            { selectedTags.map(item => <TagsSelectItem key={item.id} item={item} type='remove' />) }
          </div>
        </div>
        <TagsSelectSearch />
      </div>
    </div>
  )
}

export default TagsSelect