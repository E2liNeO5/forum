import { memo, useState } from 'react'
import styles from './ReportItem.module.scss'
import { TReport } from '../../../types/report.types'
import { Link } from 'react-router'
import { TUser } from '../../../types/user.types'
import { X } from 'lucide-react'
import Modal from '../../../components/UI/Modal/Modal'
import ConfirmDialog from '../../../components/UI/Modal/ConfirmDialog/ConfirmDialog'

type Props = {
  item: TReport
  user: TUser
}

const ReportItem = ({ item, user }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const deleteHandler = () => {
    setModalIsOpen(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div>
          <div className={styles.user_login}>
            <span className={styles.specific_text}>Автор: </span>
            <Link
              className={styles.user_link}
              to={`/profile/${user.id}`}
              target='_blank'
              rel='noopener noreferrer'
            >{ user.login }</Link>
          </div>
          <span className={styles.specific_text}>Ссылка: </span>
          <Link
            className={styles.link}
            to={item.url}
            target='_blank'
            rel='noopener noreferrer'
          >{ item.url }</Link>
        </div>
        <div>
          <span className={styles.specific_text}>Жалоба: </span>{ item.text }
        </div>
      </div>
      <div className={styles.delete_btn} onClick={deleteHandler}><X /></div>

      { modalIsOpen &&
        <Modal title='Удалить жалобу?' onClose={() => setModalIsOpen(false)}>
          <ConfirmDialog
            yesHandler={() => {}}
            noHandler={() => setModalIsOpen(false)}
          />
        </Modal>
      }
    </div>
  )
}

export default memo(ReportItem)