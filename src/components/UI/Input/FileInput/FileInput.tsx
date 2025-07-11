import { FieldError, FieldValues, Path, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import styles from '../Input.module.scss'
import stylesFile from './FileInput.module.scss'
import { ChangeEvent, DragEvent, memo, useCallback, useRef, useState } from 'react'
import { TExtraClass } from '../../../../types/global.types'
import useExtraClass from '../../../../hooks/useExtraClass'

type Props<T extends FieldValues> = {
  label: string
  error?: FieldError
  register: UseFormRegisterReturn<string>
  classes?: TExtraClass
  setValue: UseFormSetValue<any> // any - костыль
  fieldName: Path<T>
}

const FileInput = <T extends FieldValues>({ label, error, register, classes, setValue, fieldName }: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [imgSrc, setImgSrc] = useState('')
  const [dndClass, setDndClass] = useState('')

  const addExtraClass = useExtraClass(classes)

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
    setValue(fieldName, e.dataTransfer.files as T[Path<T>])
    setImgSrc(URL.createObjectURL(e.dataTransfer.files[0]))
    setDndClass('')
  }, [])

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      setImgSrc(URL.createObjectURL(e.target.files[0]))
      setValue(fieldName, e.target.files as T[Path<T>])
    }
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
      <div className={`${stylesFile.file_input_fake}${dndClass ? ' ' + dndClass : ''}${error ? ' ' + stylesFile.invalid : ''}${addExtraClass('input')}`}>
        <span className={stylesFile.file_btn}>Выбрать</span>
        <img src={imgSrc} alt="" height={45} />
      </div>
    </label>
  )
}

export default memo(FileInput)