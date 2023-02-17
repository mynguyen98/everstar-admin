import React from 'react'
import { CForm, CModalFooter, CButton } from '@coreui/react'
import { CuserToKol } from 'src/features/cusers/cusersSlice'
import { useDispatch } from 'react-redux'
const SetToKolModal = ({ name, id }) => {
  const dispatch = useDispatch()
  console.log(id)
  return (
    <div>
      <CForm className="row g-3" style={{ marginBottom: '16px' }}>
        <span>
          Do you sure to set <span style={{ color: 'red' }}>{name}</span> to be a KOL
        </span>
      </CForm>
      <CModalFooter>
        <CButton color="secondary">Back</CButton>
        <CButton color="primary" onClick={() => dispatch(CuserToKol(id))}>
          Yes
        </CButton>
      </CModalFooter>
    </div>
  )
}

export default SetToKolModal
