import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import styles from './UserBanDialog.module.scss'
import { TUserRoleData } from '../../../types/user.types'
import ConfirmDialog from '../../../components/UI/Modal/ConfirmDialog/ConfirmDialog'

type Props = {
  banReason?: string
  onClose: () => void
  okHandler: () => void
  setValues: Dispatch<SetStateAction<TUserRoleData>>
}

const UserBanDialog = ({ banReason, onClose, okHandler, setValues }: Props) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({
      ...prev,
      banReason: e.target.value
    }))
  }

  return (
    <>
      <input
        className={styles.ban_reason}
        type="text"
        placeholder='Причина бана'
        value={banReason}
        onChange={changeHandler}
      />
      <ConfirmDialog
        yesHandler={okHandler}
        noHandler={onClose}
        disabled={banReason?.trim().length === 0}
      />
    </>
  )
}

export default UserBanDialog