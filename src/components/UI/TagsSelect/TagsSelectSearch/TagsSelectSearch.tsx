import { ChangeEvent, useMemo, useState } from 'react'
import useGetTags from '../../../../hooks/tags/useGetTags'
import { TTagsSelectItem } from '../../../../types/global'
import TagsSelectItem from '../TagsSelectItem/TagsSelectItem'
import styles from './TagsSelectSearch.module.scss'
import useCreatePostSelectTags from '../../../../hooks/tags/useCreatePostSelectTags'
import { X } from 'lucide-react'

const TagsSelectSearch = () => {
  const tags = useGetTags()
  const selectedTags = useCreatePostSelectTags()
  const selectedIds = useMemo(() => selectedTags.map(t => t.id), [selectedTags])

  const [search, setSearch] = useState('')

  const selectOptions: TTagsSelectItem[] = useMemo(() => {
    return tags
      .filter(tag => !selectedIds.includes(tag.id) && tag.name.toLocaleLowerCase().indexOf(search) >= 0)
      .map(tag => ({
      id: tag.id,
      name: tag.name
    }))
  }, [tags, selectedIds, search])

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase())
  }

  return (
    <div className={styles.search_wrapper}>
      <div className={styles.search_controls}>
        <input
          type="text"
          name='tags_search'
          placeholder='Поиск'
          className={styles.search_input}
          onChange={searchHandler}
          value={search}
        />
        <X className={styles.search_reset} onClick={() => setSearch('')} />
      </div>
      <div className={styles.search_container}>
        { selectOptions.map(tag => <TagsSelectItem key={tag.id} item={tag} type='add' />) }
      </div>
    </div>
  )
}

export default TagsSelectSearch