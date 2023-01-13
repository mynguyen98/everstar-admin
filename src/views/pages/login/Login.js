import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToast } from 'src/features/uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
import { loginUser } from 'src/features/auth/authSlice'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
// import { format } from 'core-js/core/date'

const initialState = {
  email: '',
  password: '',
}
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [values, setValues] = useState(initialState)
  const { isLoading, user } = useSelector((store) => store.auth)
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])
  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = values
    if (!email || !password) {
      dispatch(
        addToast(BasicToast('#e55353', 'Login faild', 'Please check your email and password!')),
      )
      return
    }
    dispatch(loginUser({ email, password }))
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        autoComplete="username"
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        autoComplete="current-password"
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          type="submit"
                          // onClick={() =>
                          //   dispatch(
                          //     addToast(
                          //       BasicToast('#e55353', 'Login faild', 'Please fill all fields'),
                          //     ),
                          //   )
                          // }
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Wellcome</h2>
                    <p>to Everstar Global admin</p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
