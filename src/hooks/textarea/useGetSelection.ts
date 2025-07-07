import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react"
import { getTextStyle } from "../../utils"

export type TTextStyleType = 'b' | 'u' | 'i' | ''

const useGetSelection = () => {
  const [selection, setSelection] = useState({
    start: 0,
    end: 0
  })

  const getSelection = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    setSelection({
      start: e.currentTarget.selectionStart,
      end: e.currentTarget.selectionEnd
    })
  }

  const applyStyle = (text: string, setText: Dispatch<SetStateAction<string>>, style: TTextStyleType) => {
    const selectedText = text.substring(selection.start, selection.end)

    if(!selectedText) return

    const startText = text.substring(0, selection.start)
    const endText = text.substring(selection.end)
    setText(`${startText}${getTextStyle(selectedText, style)}${endText}`)
  }

  return { getSelection, applyStyle }
}

export default useGetSelection