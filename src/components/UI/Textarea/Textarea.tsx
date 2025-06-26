import { FieldError, FieldValues, Path, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import styles from './Textarea.module.scss'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import useGetSelection from '../../../hooks/textarea/useGetSelection'
import { Bold, Italic, Underline } from 'lucide-react'
import CustomizationItem from './CustomizationItem/CustomizationItem'

type Props<T extends FieldValues> = {
  error?: FieldError
  register: UseFormRegisterReturn<string>
  setValue: UseFormSetValue<T>
  fieldName: Path<T>
}

const Textarea = <T extends FieldValues>({ error, register, setValue, fieldName }: Props<T>) => {
  const [text, setText] = useState('')

  const { getSelection, applyStyle } = useGetSelection()

  const changeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)

  useEffect(() => {
    setValue(fieldName, text as T[Path<T>])
  }, [text])

  return (
    <div className={styles.post_text_container}>
      <textarea
        className={`${styles.post_text + (error ? ' ' + styles.invalid : '')}`}
        { ...register }
        onChange={changeHandler}
        onSelect={getSelection}
        value={text}
      />
      <div className={styles.font_customization_container}>
        <CustomizationItem icon={Bold} click={() => applyStyle(text, setText, 'b')}/>
        <CustomizationItem icon={Italic} click={() => applyStyle(text, setText, 'i')}/>
        <CustomizationItem icon={Underline} click={() => applyStyle(text, setText, 'u')}/>
      </div>
    </div>
  )
}

export default memo(Textarea)