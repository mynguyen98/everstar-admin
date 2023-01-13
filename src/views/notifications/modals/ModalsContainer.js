import { closeModal } from 'src/features/uiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react'

const ModalsContainer = (props) => {
  const { visible, modalContent, title, size } = props
  const dispatch = useDispatch()
  return (
    <>
      <CModal
        size={size}
        alignment="center"
        visible={visible}
        onClose={() => dispatch(closeModal())}
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
