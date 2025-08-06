import { X } from 'lucide-react'
import styles from './SearchItems.module.scss'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TExtraClass } from '../../../types/global.types'
import useExtraClass from '../../../hooks/useExtraClass'

type Props = {
  setSearch: Dispatch<SetStateAction<string>>
  classes?: Pick<TExtraClass, 'wrapper'>
}

const SearchItems = ({ setSearch, classes }: Props) => {
  const [inputValue, setInputValue] = useState('')

  const addExtraClass = useExtraClass(classes)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase())
  }

  const resetHandler = () => {
    setInputValue('')
  }

  useEffect(() => {
    setSearch(inputValue)
  }, [inputValue])

  return (
    <div className={`${styles.container + addExtraClass('wrapper')}`}>
      <input
        type="text"
        placeholder='Поиск'
        className={styles.search_input}
        onChange={changeHandler}
        value={inputValue}
      />
      <X className={styles.reset} onClick={resetHandler} />
    </div>
  )
}

export default SearchItems