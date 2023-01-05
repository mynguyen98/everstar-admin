import React from 'react'
import { useSelector } from 'react-redux'
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
  const { name, email, title, country, price, address } = useSelector((store) => store.idol)
  return (
    <div>
      <CCard>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputNameIdol">Name</CFormLabel>
              <CFormInput type="text" id="inputNameIdol" value={name} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputEmailIdol">Email</CFormLabel>
              <CFormInput type="email" id="inputEmailIdol" value={email} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputTitleIdol">Title</CFormLabel>
              <CFormInput id="inputTitleIdol" value={title} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputCityIdol">Country</CFormLabel>
              <CFormInput id="inputCityIdol" value={country} />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPriceIdol">Price</CFormLabel>
              <CFormInput id="inputPriceIdol" value={price} />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputAddressIdol">Address</CFormLabel>
              <CFormInput id="inputAddressIdol" placeholder="1234 Main St" value={address} />
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default EditIdolForm
