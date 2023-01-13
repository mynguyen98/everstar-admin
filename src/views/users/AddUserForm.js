import SweetPagination from 'sweetpagination'
import React, { useEffect } from 'react'
import { addToast } from 'src/features/uiSlice'
import BasicToast from '../notifications/toasts/BasicToast'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from 'src/features/user/userSlice'
import { useState } from 'react'
import { handleChangeInput, clearFields } from 'src/features/user/userSlice'
import { usersList, updateCurrentPage, setAddMMorePage } from 'src/features/users/usersSlice'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import StatusEditModal from './StatusEditModal'
import { showModal } from 'src/features/uiSlice'
import EditPassModal from './EditPassModal'
import Menu from '../menus/Menu'
import UserModifiedMenu from './UserModifiedMenu'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CAvatar,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CFormSelect,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CTableBody,
  CPopover,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilOptions, cilPlus } from '@coreui/icons'
const AddUserForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  // search field

  // ////////////
  const { isEditing, isLoading, name, email, password, profilePicUrl, repeatPw } = user

  // Handle pagination

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handleChangeInput({ [name]: value }))
  }
  // Handle form submit
  const onSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !repeatPw || !profilePicUrl) {
      dispatch(
        addToast(BasicToast('#e55353', 'please fill out all field', 'check all field carefully')),
      )
      return
    }
    if (password !== repeatPw) {
      dispatch(
        addToast(
          BasicToast(
            '#e55353',
            'password does not match',
            'check password and repeat password carefully',
          ),
        ),
      )
      return
    }
    dispatch(signupUser({ name, email, password, profilePicUrl }))
  }
  return (
    <CCard>
      <CCardBody>
        <CForm className="row g-3" onSubmit={onSubmit}>
          <CCol md={6}>
            <CFormLabel htmlFor="inputNameUser">Name</CFormLabel>
            <CFormInput
              name="name"
              type="text"
              id="inputNameUser"
              required
              value={name}
              onChange={handleChange}
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputEmailUser">Email</CFormLabel>
            <CFormInput
              name="email"
              type="email"
              value={email}
              id="inputEmailUser"
              required
              onChange={handleChange}
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputPassUser">Password</CFormLabel>
            <CFormInput
              value={password}
              name="password"
              type="password"
              id="inputPassUser"
              required
              onChange={handleChange}
            />
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputRepeatPassUser">Repeat password</CFormLabel>
            <CFormInput
              value={repeatPw}
              name="repeatPw"
              type="password"
              id="inputRepeatPassUser"
              required
              onChange={handleChange}
            />
          </CCol>
          {/* <CCol md={6}>
              <CFormLabel htmlFor="inputUserRole">Role</CFormLabel>
              <CFormSelect aria-label="Default select example" id="inputUserRole">
                <option value="1">Guess</option>
                <option value="2">Admin</option>
              </CFormSelect>
            </CCol> */}
          {/* <CCol xs={12}>
              <CFormLabel htmlFor="inputUserAddress">Address</CFormLabel>
              <CFormInput id="inputUserAddress" placeholder="1234 Minh Khai, Hai Bà Trưng" />
            </CCol> */}
          <CCol xs={12}>
            <CFormLabel htmlFor="inputUserImg">Avartar</CFormLabel>
            <CFormInput
              value={profilePicUrl}
              name="profilePicUrl"
              id="inputUserImg"
              placeholder="Image url"
              required
              onChange={handleChange}
            />
          </CCol>
          <CRow className="margin-item">
            <CCol sm="auto">
              <CButton type="submit">Create account</CButton>
            </CCol>
            <CCol>
              <CButton color="secondary" onClick={() => dispatch(clearFields())}>
                Clear all
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AddUserForm
