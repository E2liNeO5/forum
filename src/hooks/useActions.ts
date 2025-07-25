import { bindActionCreators } from "@reduxjs/toolkit"
import { tagsActions } from "../store/slices/tags.slice"
import { useAppDispatch } from "./typedHooks"
import { useMemo } from "react"
import { toastsActions } from "../store/slices/toasts.slice"
import { userActions } from "../store/slices/user.slice"
import { textareaActions } from "../store/slices/textarea.slice"

const rootActions = {
  ...tagsActions,
  ...toastsActions,
  ...userActions,
  ...textareaActions
}

const useActions = () => {
  const dispatch = useAppDispatch()
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}

export default useActions