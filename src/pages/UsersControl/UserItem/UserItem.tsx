import { memo, useCallback, useState } from 'react'
import styles from './UserItem.module.scss'
import { TUser, TUserRoleData } from '../../../types/user.types'
import { Link } from 'react-router'
import { Check, UserLock, UserPen, X } from 'lucide-react'
import useBanUser from '../../../hooks/user/useBanUser'
import UserRoleSelector from '../UserRoleSelector/UserRoleSelector'
import useEditUserRole from '../../../hooks/user/useEditUserRole'
import Modal from '../../../components/UI/Modal/Modal'
import UserBanDialog from '../UserBanDialog/UserBanDialog'

type Props = {
  user: TUser
}

const UserItem = ({ user }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [roleEdit, setRoleEdit] = useState(false)
  const [editedValues, setEditedValues] = useState<TUserRoleData>({
    role: user.role,
    banReason: user.banReason || ''
  })
  const [initialData, setInitialData] = useState<TUserRoleData>({
    role: user.role,
    banReason: user.banReason || ''
  })

  const banUser = useBanUser()
  const editUserRole = useEditUserRole()


  const setUserEditedData = (result?: TUserRoleData) => {
    if(result) {
      setEditedValues(result)
      setInitialData(result)
    }
  }

  const banHandler = useCallback(async () => {
    const result = await banUser({
      id: user.id,
      banReason: editedValues.banReason || ''
    }, user.login)
    setUserEditedData(result)
    setModalIsOpen(false)
  }, [editedValues.role, editedValues.banReason, roleEdit])

  const greenHandler = useCallback(async () => {
    if(!roleEdit)
      setRoleEdit(true)
    else {
      const result = await editUserRole({
        id: user.id,
        role: editedValues.role
      }, user.login)
      setUserEditedData(result)
      setRoleEdit(false)
    }
  }, [editedValues.role, roleEdit])

  const redHandler = () => {
    if(roleEdit) {
      setRoleEdit(false)
      setEditedValues(prev => ({
        ...prev,
        role: initialData.role
      }))
    }
    else
      setModalIsOpen(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.user_container}>
        <img src={`/upload/${user.image}`} alt="user avatar" className={styles.user_image} />

        <div className={styles.user_details}>
          <div className={styles.user_login}>Логин: <Link className={styles.user_link} to={`/profile/${user.id}`}>{ user.login } (id={user.id})</Link></div>
          <div className={styles.user_role}>
            Роль: <UserRoleSelector role={editedValues.role} setValues={setEditedValues} isDisabled={!roleEdit} />
          </div>
        </div>

        <div className={styles.buttons}>
          <div className={`${styles.button} ${styles.green}`} onClick={greenHandler}>
            { roleEdit ? <Check size={24} /> : <UserPen size={24} /> }
          </div>
          <div className={`${styles.button} ${styles.red}${initialData.role === 'banned' && !roleEdit ? ' ' + styles.disabled : ''}`} onClick={redHandler}>
            { roleEdit ? <X size={24} /> : <UserLock size={24} /> }
          </div>
        </div>
      </div>

      { initialData.banReason &&
        <div className={styles.ban_reason}>
          Причина бана: { initialData.banReason }
        </div>
      }

      { modalIsOpen &&
        <Modal
          title={`Забанить пользователя "${user.login}"?`}
          onClose={() => setModalIsOpen(false)}
        >
          <UserBanDialog
            banReason={editedValues.banReason}
            setValues={setEditedValues}
            onClose={() => setModalIsOpen(false)}
            okHandler={banHandler}
          />
        </Modal>
      }
    </div>
  )
}

export default memo(UserItem)