import { ChangeEvent, memo, useCallback, useRef, useState } from 'react'
import styles from './TagItem.module.scss'
import { Check, Pencil, Trash, X } from 'lucide-react'
import useEditTagName from '../../../hooks/tags/useEditTagName'
import useDeleteTag from '../../../hooks/tags/useDeleteTag'
import Modal from '../../../components/UI/Modal/Modal'
import ConfirmDialog from '../../../components/UI/Modal/ConfirmDialog/ConfirmDialog'

type Props = {
  id: number
  name: string
}

const TagItem = ({ id, name }: Props) => {
  const ref = useRef(null)

  const [tagName, setTagName] = useState(name)
  const [isEdit, setIdEdit] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const editTagName = useEditTagName()
  const deleteTag = useDeleteTag()

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value)
  }

  const greenHandler = () => {
    if(!isEdit)
      setIdEdit(true)
    else {
      setIdEdit(false)
      editTagName({ id, name: tagName })
    }
  }

  const redHandler = () => {
    if(isEdit)
      setIdEdit(false)
    else
      setModalIsOpen(true)
  }

  const deleteTagHandler = useCallback(() => {
    deleteTag(id)
    setModalIsOpen(false)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.tag_name}>
        <input
          type="text"
          value={tagName}
          disabled={isEdit ? false : true}
          title={tagName}
          onChange={changeHandler}
          ref={ref}
          className={isEdit ? styles.edit : ''}
        />
      </div>
      <div className={styles.buttons}>
        <div className={`${styles.button} ${styles.green}`} onClick={greenHandler}>
          { isEdit ? <Check size={16} /> : <Pencil size={16} /> }
        </div>
        <div className={`${styles.button} ${styles.red}`} onClick={redHandler}>
          { isEdit ? <X size={16} /> : <Trash size={16} /> }
        </div>
      </div>
      { modalIsOpen &&
        <Modal title={`Удалить тэг "${name}"?`} onClose={() => setModalIsOpen(false)}>
          <ConfirmDialog yesHandler={deleteTagHandler} noHandler={() => setModalIsOpen(false)} />
        </Modal>
      }
    </div>
  )
}

export default memo(TagItem)