import { ChangeEvent, useMemo, useState } from 'react'
import useGetTags from '../../../../hooks/tags/useGetTags'
import TagsSelectItem from '../TagsSelectItem/TagsSelectItem'
import styles from './TagsSelectSearch.module.scss'
import useCreatePostSelectTags from '../../../../hooks/tags/useCreatePostSelectTags'
import { X } from 'lucide-react'
import Loading from '../../Loading/Loading'

const TagsSelectSearch = () => {
  const { isLoading, tags, error } = useGetTags()
  const selectedTags = useCreatePostSelectTags()
  const selectedIds = useMemo(() => selectedTags.map(t => t.id), [selectedTags])

  const [search, setSearch] = useState('')

  const selectOptions = useMemo(() => {
    return isLoading ? <Loading /> :
      error ? <h4>Тэги не найдены</h4> :
      tags && tags
        .filter(tag => !selectedIds.includes(tag.id) && tag.name.toLocaleLowerCase().indexOf(search) >= 0)
        .map(tag => <TagsSelectItem key={tag.id} item={tag} type='add' />)
  }, [isLoading, error, tags, selectedIds, search])

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
        { selectOptions }
      </div>
    </div>
  )
}

export default TagsSelectSearch