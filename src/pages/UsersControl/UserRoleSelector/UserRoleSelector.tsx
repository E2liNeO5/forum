import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { USER_ROLES } from '../../../constants'
import styles from './UserRoleSelector.module.scss'
import { TUserRoleData } from '../../../types/user.types'

type Props = {
  role: string
  setValues: Dispatch<SetStateAction<TUserRoleData>>
  isDisabled: boolean
}

const UserRoleSelector = ({ role, setValues, isDisabled }: Props) => {
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value !== 'banned')
      setValues(prev => ({
        ...prev,
        role: e.target.value
      }))
  }

  return (
    <select
      name="user_role"
      className={styles.selector}
      value={role}
      onChange={changeHandler}
      disabled={isDisabled}
    >
      { USER_ROLES.map(userRole => <option key={userRole.value} value={userRole.value}>{ userRole.title }</option>) }
    </select>
  )
}

export default UserRoleSelector