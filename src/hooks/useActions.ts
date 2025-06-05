import { bindActionCreators } from "@reduxjs/toolkit"
import { postsActions } from "../store/slices/posts.slice"
import { tagsActions } from "../store/slices/tags.slice"
import { useAppDispatch } from "./typedHooks"
import { useMemo } from "react"
import { toastsActions } from "../store/slices/toasts.slice"
import { userActions } from "../store/slices/user.slice"

const rootActions = {
  ...tagsActions,
  ...postsActions,
  ...toastsActions,
  ...userActions
}

const useActions = () => {
  const dispatch = useAppDispatch()
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}

export default useActions