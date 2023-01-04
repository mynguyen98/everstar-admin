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
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar1 from 'src/assets/images/avatars/1.jpg'
const Profile = () => {
  return (
    <>
      <CCard className="profile-container">
        <CCardBody>
          <CRow className="profile-heading">
            <CCol sm={1}>
              <div>
                <CAvatar size="xl" src={avatar1} className="avatar-border" />
              </div>
            </CCol>
            <CCol>
              <div>My Nguyen</div>
              <div>mynguyen@gmail.com</div>
              <div>role: GUEST</div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <h5 className="form-padding">Change profile</h5>
      <CCard>
        <CCardBody>
          <CForm className="row g-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputName">Name</CFormLabel>
              <CFormInput type="text" id="inputName" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputEmail4">Email</CFormLabel>
              <CFormInput type="email" id="inputEmail4" />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputAddress">Address</CFormLabel>
              <CFormInput id="inputAddress" placeholder="1234 Main St" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputCity">City</CFormLabel>
              <CFormInput id="inputCity" />
            </CCol>
            <CCol xs={12}>
              <CButton type="submit">Save changes</CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Profile
