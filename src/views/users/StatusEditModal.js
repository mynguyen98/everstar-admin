import React from 'react'
import { CModalFooter, CButton } from '@coreui/react'
import { toggleUsersStatus } from 'src/features/users/usersSlice'
import { useDispatch } from 'react-redux'
import { closeModal } from 'src/features/uiSlice'
const StatusEditModal = ({ id, text }) => {
  const dispatch = useDispatch()
  return (
    <>
      <span>
        Are you sure to <strong>{text}</strong> this user?
      </span>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => {
            dispatch(closeModal())
            dispatch(toggleUsersStatus(id))
          }}
        >
          Yes
        </CButton>
      </CModalFooter>
    </>
  )
}

export default StatusEditModal
