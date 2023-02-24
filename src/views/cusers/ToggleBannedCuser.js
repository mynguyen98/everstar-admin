import React from 'react'
import { CForm, CModalFooter, CButton } from '@coreui/react'
import { toggleBannedCuser } from 'src/features/cusers/cusersSlice'
import { useDispatch } from 'react-redux'
import { closeModal } from 'src/features/uiSlice'
import { updateCuserDetail } from 'src/features/cusers/cusersSlice'
const ToggleBannedCuser = ({ name, id, isBanned, updateUserDetail }) => {
  console.log(updateUserDetail)
  const dispatch = useDispatch()

  return (
    <div>
      <CForm className="row g-3" style={{ marginBottom: '16px' }}>
        <span>
          {isBanned ? 'unban' : 'ban'}
          <span style={{ color: 'red' }}> {name}</span>?
        </span>
      </CForm>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            dispatch(closeModal())
          }}
        >
          Back
        </CButton>
        <CButton
          color="primary"
          onClick={() => {
            dispatch(toggleBannedCuser(id))
            dispatch(closeModal())
            if (updateUserDetail) {
              dispatch(updateCuserDetail(!isBanned))
            }
          }}
        >
          Yes
        </CButton>
      </CModalFooter>
    </div>
  )
}

export default ToggleBannedCuser
