import { FieldError, FieldValues, Path, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'
import styles from './Textarea.module.scss'
import { ChangeEvent, memo, useEffect } from 'react'
import useGetSelection from '../../../hooks/textarea/useGetSelection'
import { Bold, Italic, Underline } from 'lucide-react'
import CustomizationItem from './CustomizationItem/CustomizationItem'
import { TExtraClass } from '../../../types/global.types'
import useExtraClass from '../../../hooks/useExtraClass'
import useActions from '../../../hooks/useActions'
import useGetTextareaText from '../../../hooks/textarea/useGetTextareaText'

type Props<T extends FieldValues> = {
  error?: FieldError
  register: UseFormRegisterReturn<string>
  setValue: UseFormSetValue<any> // any - костыль
  fieldName: Path<T>
  classes?: TExtraClass
}

const Textarea = <T extends FieldValues>({ error, register, setValue, fieldName, classes }: Props<T>) => {
  const { setTextareaText } = useActions()
  const text = useGetTextareaText()
  const { getSelection, applyStyle } = useGetSelection(text)

  const addExtraClass = useExtraClass(classes)

  const changeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaText(e.target.value)
  }

  useEffect(() => {
    setValue(fieldName, text as T[Path<T>])
  }, [text])

  return (
    <div className={styles.text_container + addExtraClass('wrapper')}>
      <textarea
        className={`${styles.text + (error ? ' ' + styles.invalid : '')}`}
        { ...register }
        onChange={changeHandler}
        onSelect={getSelection}
        value={text}
      />
      <div className={styles.font_customization_container}>
        <CustomizationItem icon={Bold} click={() => applyStyle('b')}/>
        <CustomizationItem icon={Italic} click={() => applyStyle('i')}/>
        <CustomizationItem icon={Underline} click={() => applyStyle('u')}/>
      </div>
    </div>
  )
}

export default memo(Textarea)