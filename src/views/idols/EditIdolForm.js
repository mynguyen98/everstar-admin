import React from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CAvatar,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
} from '@coreui/react'
const EditIdolForm = () => {
  return (
    <div>
      <CCard>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputNameIdol">Name</CFormLabel>
              <CFormInput type="text" id="inputNameIdol" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputEmailIdol">Email</CFormLabel>
              <CFormInput type="email" id="inputEmailIdol" />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputAddressIdol">Address</CFormLabel>
              <CFormInput id="inputAddressIdol" placeholder="1234 Main St" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputCityIdol">City</CFormLabel>
              <CFormInput id="inputCity" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputCityIdol">City</CFormLabel>
              <CFormInput id="inputCity" />
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default EditIdolForm
