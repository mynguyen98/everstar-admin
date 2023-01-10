import React from 'react'
import { CModalFooter, CButton } from '@coreui/react'
import { toggleUsersStatus } from 'src/features/users/usersSlice'
import { useDispatch } from 'react-redux'
const StatusEditModal = ({ id }) => {
  const dispatch = useDispatch()
  return (
    <>
      <span>Do you sure to block this user?</span>
      <CModalFooter>
        <CButton color="primary" onClick={() => dispatch(toggleUsersStatus(id))}>
          Save changes
        </CButton>
      </CModalFooter>
    </>
  )
}

export default StatusEditModal
