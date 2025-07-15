import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useState } from "react"

export type TTextStyleType = 'b' | 'u' | 'i' | ''

const useGetSelection = (text: string, setText: Dispatch<SetStateAction<string>>) => {
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

  const getTextStyle = useCallback((text: string, style: TTextStyleType) => style ? `<${style}>${text}</${style}>` : text, [])

  const applyStyle = useCallback((style: TTextStyleType) => {
    const selectedText = text.substring(selection.start, selection.end)
    if(!selectedText) return

    const startText = text.substring(0, selection.start)
    const endText = text.substring(selection.end)
    setText(`${startText}${getTextStyle(selectedText, style)}${endText}`)
  }, [selection])

  return { getSelection, applyStyle }
}

export default useGetSelection