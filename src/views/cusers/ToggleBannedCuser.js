import React from 'react'
import { CForm, CModalFooter, CButton } from '@coreui/react'
import { toggleBannedCuser } from 'src/features/cusers/cusersSlice'
import { useDispatch } from 'react-redux'
import { closeModal } from 'src/features/uiSlice'
const ToggleBannedCuser = ({ name, id, isBanned }) => {
  const dispatch = useDispatch()
  console.log(id)
  return (
    <div>
      <CForm className="row g-3" style={{ marginBottom: '16px' }}>
        <span>
          {isBanned ? 'unban' : 'ban'}
          <span style={{ color: 'red' }}> {name}</span>?
        </span>
      </CForm>
      <CModalFooter>
        <CButton color="secondary">Back</CButton>
        <CButton
          color="primary"
          onClick={() => {
            dispatch(toggleBannedCuser(id))
            dispatch(closeModal())
          }}
        >
          Yes
        </CButton>
      </CModalFooter>
    </div>
  )
}

export default ToggleBannedCuser
