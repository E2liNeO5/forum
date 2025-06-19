import { FieldError, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import styles from '../Input.module.scss'
import stylesFile from './FIleInput.module.scss'
import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react'
import { CreatePostType } from '../../../../types/post'

type extraKeys = keyof (Exclude<Props['classes'], undefined>)

type Props = {
  label: string
  error?: FieldError
  register: UseFormRegisterReturn<string>
  classes?: {
    label?: string
    input?: string
    block?: string
  }
  setValue: UseFormSetValue<CreatePostType>
}

const FileInput = ({ label, error, register, classes, setValue }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [imgSrc, setImgSrc] = useState('')
  const [dndClass, setDndClass] = useState('')

  const addExtraClass = useCallback((item: extraKeys) => {
    return classes && classes[item] ? ' ' + classes[item] : ''
  }, [])

  const dragOverHandler = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDndClass(stylesFile.dnd)
  }, [])

  const dragLeaveHandler = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDndClass('')
  }, [])

  const dropHandler = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setValue('image', e.dataTransfer.files)
    setImgSrc(URL.createObjectURL(e.dataTransfer.files[0]))
    setDndClass('')
  }, [])

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files)
      setImgSrc(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <label
      className={`${styles.input_block + (addExtraClass('block'))}`}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
    >
      <span className={`${styles.input_label + (addExtraClass('label'))}`}>{ label }</span>
      <input
        className={`${stylesFile.file_input}`}
        type='file'
        { ...register }
        ref={inputRef}
        onChange={changeHandler}
      />
      <div className={`${stylesFile.file_input_fake} ${dndClass} ${error ? styles.invalid : ''}${addExtraClass('input')}`}>
        <span className={stylesFile.file_btn}>Выбрать</span>
        <img src={imgSrc} alt="" height={45} />
      </div>
    </label>
  )
}

export default FileInput