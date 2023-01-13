import React, { useState } from 'react'
import { CModalFooter, CButton } from '@coreui/react'
import { toggleUsersStatus } from 'src/features/users/usersSlice'
import { useDispatch } from 'react-redux'
import { CForm, CCol, CFormLabel, CFormInput } from '@coreui/react'
import { updateUsersPw } from 'src/features/users/usersSlice'
import { addToast } from 'src/features/uiSlice'
import BasicToast from 'src/views/notifications/toasts/BasicToast'
import { closeModal } from 'src/features/uiSlice'
const EditPassModal = ({ id }) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({ password: '', repeatPw: '' })
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }
  const handleSubmit = (e) => {
    // console.log(e)
    // e.preventDefault()
    if (values.password !== values.repeatPw) {
      dispatch(addToast(BasicToast('#e55353', 'Password and repeat password does not match')))
      return
    }
    dispatch(updateUsersPw({ id, password: values.password }))
  }
  return (
    <>
      <CForm className="row g-3" style={{ marginBottom: '16px' }}>
        <CCol md={6}>
          <CFormLabel htmlFor="inputName">Password</CFormLabel>
          <CFormInput
            name="password"
            type="password"
            id="userPassEdit"
            onChange={handleChange}
            required
          />
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="inputName">Confirm password</CFormLabel>
          <CFormInput
            name="repeatPw"
            type="password"
            id="userPassEdit"
            onChange={handleChange}
            required
          />
        </CCol>
      </CForm>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => {
            dispatch(closeModal())
            handleSubmit()
          }}
        >
          Save changes
        </CButton>
      </CModalFooter>
    </>
  )
}

export default EditPassModal
