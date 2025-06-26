import { LucideIcon } from 'lucide-react'
import styles from './CustomizationItem.module.scss'

type Props = {
  icon: LucideIcon
  click: () => void
}

const CustomizationItem = ({ icon: IconType, click }: Props) => {
  return (
    <IconType className={styles.icon} onClick={click} />
  )
}

export default CustomizationItem