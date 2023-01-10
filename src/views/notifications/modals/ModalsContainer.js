import { useState } from 'react'
import { closeModal } from 'src/features/uiSlice'
import { useDispatch } from 'react-redux'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
const ModalsContainer = ({ visible, modalContent, title, size }) => {
  const dispatch = useDispatch()
  return (
    <>
      {/* <CButton onClick={() => setVisible(!visible)}>Vertically centered modal</CButton> */}
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
export default ModalsContainer
