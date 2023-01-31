import React from 'react'
import {
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CModalFooter,
  CButton,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
const SetToKolModal = () => {
  return (
    <div>
      <CForm className="row g-3" style={{ marginBottom: '16px' }}>
        <CCol md={12}>
          <CFormLabel htmlFor="selectKolPrice">price</CFormLabel>
          <CFormSelect size="sm" className="mb-3" id="selectKolPrice">
            <option>Select price</option>
            <option value="1">99$</option>
            <option value="2">100$</option>
            <option value="3">200$</option>
          </CFormSelect>
        </CCol>
        <CCol md={12}>
          <CFormTextarea
            id="bioUserEditToIdol"
            label="Kol bio"
            rows={3}
            text="Must be 8-20 words long."
          ></CFormTextarea>
        </CCol>
      </CForm>
      <CModalFooter>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </div>
  )
}

export default SetToKolModal
