import React from 'react'
import { signupUser } from 'src/features/user/userSlice'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const initialState = {
  name: '',
  email: '',
  password: '',
  profilePicUrl: null,
  repeatPw: '',
  isEdit: false,
}

const Register = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState(initialState)
  const { isLoading, user } = useSelector((store) => store.auth)
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
    console.log(values)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, repeatPw, profilePicUrl } = values
    if (!name || !email || !password || !repeatPw || !profilePicUrl || password !== repeatPw) {
      return
    }
    dispatch(signupUser({ name, email, password, profilePicUrl }))
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onSubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="name"
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      required
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      required
                      onChange={handleChange}
                      value={values.email}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      required
                      onChange={handleChange}
                      value={values.password}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="repeatPw"
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      required
                      onChange={handleChange}
                      value={values.repeatPw}
                    />
                  </CInputGroup>
                  <p style={{ margin: '8px 0', color: '#2c384aae' }}>Choose profile picture</p>
                  {/* <CInputGroup className="mb-4">
                    <CFormInput
                      type="file"
                      id="formFile"
                      name="profilePicUrl"
                      placeholder="choose profile picture"
                      value={values.profilePicUrl}
                      onChange={handleChange}
                    />
                  </CInputGroup> */}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="profilePicUrl"
                      type="text"
                      required
                      placeholder="enter profile picture"
                      value={values.profilePicUrl}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
