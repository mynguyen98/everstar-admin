import { closeModal, closeModal2 } from 'src/features/uiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react'

const ModalsContainer = (props) => {
  const dispatch = useDispatch()
  const { visible, modalContent, title, size, type } = props
  const close = () => {
    if (type === 'modal') {
      dispatch(closeModal())
    } else {
      dispatch(closeModal2())
    }
  }
  const style = () => {
    if (type === 'modal') {
      return {
        zIndex: '5',
      }
    } else {
      return {
        zIndex: '10',
      }
    }
  }
  return (
    <>
      <CModal
        size={size}
        alignment="center"
        visible={visible}
        onClose={close}
        style={style()}
        className={type === 'modal2' ? 'modal2' : ''}
      >
        <CModalHeader>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{modalContent}</CModalBody>
      </CModal>
    </>
  )
}
// this modal will be import to app js
export default ModalsContainer
