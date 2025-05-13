import { bindActionCreators } from "@reduxjs/toolkit"
import { postsActions } from "../store/posts.slice"
import { tagsActions } from "../store/tags.slice"
import { userActions } from "../store/user.slice"
import { useAppDispatch } from "./typedHooks"
import { useMemo } from "react"

const rootActions = {
  ...userActions,
  ...tagsActions,
  ...postsActions
}

const useActions = () => {
  const dispatch = useAppDispatch()
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}

export default useActions