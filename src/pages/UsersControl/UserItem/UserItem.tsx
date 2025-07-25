import { ChangeEvent, memo, useCallback, useState } from 'react'
import styles from './UserItem.module.scss'
import { TUser } from '../../../types/user.types'
import { Link } from 'react-router'
import { Check, UserLock, UserPen, X } from 'lucide-react'
import useBanUser from '../../../hooks/user/useBanUser'
import useActions from '../../../hooks/useActions'
import UserRoleSelector from '../UserRoleSelector/UserRoleSelector'
import useEditUserRole from '../../../hooks/user/useEditUserRole'

type Props = {
  user: TUser
}

const UserItem = ({ user }: Props) => {
  const [banEdit, setBanEdit] = useState(false)
  const [roleEdit, setRoleEdit] = useState(false)
  const [banReason, setBanReason] = useState(user.banReason || '')
  const [userRole, setUserRole] = useState(user.role)

  const banUser = useBanUser()
  const editUserRole = useEditUserRole()
  const { addToast } = useActions()

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBanReason(e.target.value)
  }

  const setDefault = useCallback(() => {
    setBanEdit(false)
    setRoleEdit(false)
    setUserRole(user.role)
    setBanReason(user.banReason || '')
  }, [])

  const greenHandler = () => {
    if(banEdit && banReason) { // Обработка бана
      banUser({
        id: user.id,
        banReason
      }, user.login)
        .then(result => {
          setDefault()
          setUserRole(result?.role || '')
          setBanReason(result?.banReason || '')
        })
    } else if(banEdit && !banReason) { // Не написана причина бана
      addToast({
        text: 'Напишите причину бана',
        type: 'error'
      })
    } else if(!roleEdit && !banEdit) // Включение смены роли
      setRoleEdit(true)
    else if(roleEdit && user.role !== userRole) { // Обработка смены роли
      editUserRole({
        id: user.id,
        role: userRole
      }, user.login)
        .then(result => {
          setDefault()
          setUserRole(result?.role || '')
          setBanReason(result?.banReason || '')
        })
    }
  }

  const redHandler = () => {
    if(!banEdit && !roleEdit)
      setBanEdit(true)
    else if(banEdit || roleEdit)
      setDefault()
  }

  return (
    <div className={`${styles.container}${banEdit ? ' ' + styles.open_ban_reason : ''}`}>
      <div className={styles.user_container}>
        <img src={`/upload/${user.image}`} alt="user avatar" className={styles.user_image} />
        <div className={styles.user_details}>
          <div className={styles.user_login}>Логин: <Link className={styles.user_link} to={`/profile/${user.id}`}>{ user.login }</Link></div>
          <div className={styles.user_role}>
            Роль: <UserRoleSelector role={userRole} setRole={setUserRole} isDisabled={!roleEdit} />
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={`${styles.button} ${styles.green}`} onClick={greenHandler}>
            { banEdit || roleEdit ? <Check size={24} /> : <UserPen size={24} /> }
          </div>
          <div className={`${styles.button} ${styles.red}`} onClick={redHandler}>
            { banEdit || roleEdit ? <X size={24} /> : <UserLock size={24} /> }
          </div>
        </div>
      </div>
      
      <div className={styles.ban_reason}>
        <input
          type="text"
          placeholder='Причина бана'
          value={banReason}
          onChange={changeHandler}
        />
      </div>
    </div>
  )
}

export default memo(UserItem)