import React, { useState } from 'react'
import { updateProfile } from 'src/features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
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
  const dispatch = useDispatch()
  const { user } = useSelector((store) => {
    console.log(store.auth)
    return store.auth.user
  })
  console.log(user)
  const { name, profilePicUrl, roles } = user
  const [values, setValues] = useState({ name, profilePicUrl: '' })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, profilePicUrl } = values
    if (!name || !profilePicUrl) {
      return
    }
    dispatch(updateProfile({ name, profilePicUrl }))
  }

  return (
    <>
      <CCard className="profile-container">
        <CCardBody>
          <CRow className="profile-heading">
            {/* <CCol>
            </CCol> */}
            {/* <CCol> */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <CAvatar size="xl" src={profilePicUrl} className="avatar-border" />
              <div>
                <div>{name}</div>
                <div>role: {roles[0].code}</div>
              </div>
            </div>
          </CRow>
        </CCardBody>
      </CCard>
      <h5 className="form-padding">Change profile</h5>
      <CCard>
        <CCardBody>
          <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
              <CFormLabel htmlFor="inputName">Name</CFormLabel>
              <CFormInput
                name="name"
                type="text"
                id="inputName"
                value={values.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="profilePicUrlUser">Profile picture</CFormLabel>
              <CFormInput
                name="profilePicUrl"
                type="text"
                id="profilePicUrlUser"
                placeholder="input profile picture"
                onChange={handleChange}
                required
              />
            </CCol>
            {/* <CCol md={6}>
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
            </CCol> */}
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
