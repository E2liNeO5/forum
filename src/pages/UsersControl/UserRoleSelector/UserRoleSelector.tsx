import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { USER_ROLES } from '../../../constants'
import styles from './UserRoleSelector.module.scss'

type Props = {
  role: string
  setRole: Dispatch<SetStateAction<string>>
  isDisabled: boolean
}

const UserRoleSelector = ({ role, setRole, isDisabled }: Props) => {
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value !== 'banned') {
      setRole(e.target.value)
    }
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