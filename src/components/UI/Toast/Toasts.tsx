import styles from './Toast.module.scss'
import { useAppSelector } from "../../../hooks/typedHooks"
import Toast from './Toast'

const Toasts = () => {
  const { toasts } = useAppSelector(state => state.toast)

  return (
    
    <div className={styles.toasts_container}>
      { toasts.map(toast => <Toast key={toast.id} toast={toast} />) }
    </div>
  )
}

export default Toasts