import { useState } from "react"

const useTextareaReset = () => {
  const [isReset, setIsReset] = useState(false)

  const reset = () => {
    setIsReset(true)
    setTimeout(() => setIsReset(false), 0)
  }

  return { reset, isReset }
}

export default useTextareaReset