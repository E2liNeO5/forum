import { MessageCircleWarning } from 'lucide-react'
import styles from './ReportButton.module.scss'
import { ChangeEvent, useState } from 'react'
import Modal from '../Modal/Modal'
import ConfirmDialog from '../Modal/ConfirmDialog/ConfirmDialog'
import useCreateReport from '../../../hooks/reports/useCreateReport'
import { getCurrentDate } from '../../../utils'
import { TExtraClass } from '../../../types/global.types'
import useExtraClass from '../../../hooks/useExtraClass'

type Props = {
  size?: number
  url: string
  userId: number
  classes?: Pick<TExtraClass, 'wrapper'>
}

const ReportButton = ({ size, url, userId, classes }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [reason, setReason] = useState('')

  const createReport = useCreateReport()

  const addExtraClass = useExtraClass(classes)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value)
  }

  const closeModal = () => {
    setIsOpen(false)
    setReason('')
  }

  const createReportHandler = async () => {
    await createReport({
      text: reason,
      date: getCurrentDate(),
      userId,
      url
    })
    closeModal()
  }

  return (
    <>
      <div className={styles.container + addExtraClass('wrapper')} onClick={() => setIsOpen(true)} title='Пожаловаться'>
        <MessageCircleWarning size={size ? size : 24} />
      </div>
      { isOpen && <Modal title='Напишите причину жалобы' onClose={closeModal}>
          <input
            type="text"
            className={styles.reason_input}
            placeholder='Причина'
            value={reason}
            onChange={changeHandler}
          />
          <ConfirmDialog
            yesHandler={createReportHandler}
            noHandler={closeModal}
            yesText='Ок'
            noText='Отмена'
            disabled={reason.trim().length === 0}
          />
        </Modal> }
    </>
  )
}

export default ReportButton