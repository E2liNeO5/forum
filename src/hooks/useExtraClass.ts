import { useCallback } from "react"
import { TExtraClass } from "../types/global.types"

const useExtraClass = (classes?: TExtraClass) => {
  const addExtraClass = useCallback((item: keyof TExtraClass) => {
    return classes && classes[item] ? ' ' + classes[item] : ''
  }, [])

  return addExtraClass
}

export default useExtraClass