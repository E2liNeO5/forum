import { X } from 'lucide-react'
import styles from './PostSearch.module.scss'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
  setSearch: Dispatch<SetStateAction<string>>
}

const PostSearch = ({ setSearch }: Props) => {
  const [inputValue, setInputValue] = useState('')

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    setSearch(inputValue)
  }, [inputValue])

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder='Поиск'
        className={styles.search_input}
        onChange={changeHandler}
        value={inputValue}
      />
      <X className={styles.search_reset} onClick={() => setInputValue('')} />
    </div>
  )
}

export default PostSearch