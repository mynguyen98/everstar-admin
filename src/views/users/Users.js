import SweetPagination from 'sweetpagination'
import React, { useEffect } from 'react'
import { addToast } from 'src/features/uiSlice'
import BasicToast from '../notifications/toasts/BasicToast'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from 'src/features/user/userSlice'
import { useState } from 'react'
import { handleChangeInput, clearFields } from 'src/features/user/userSlice'
import { usersList, updateCurrentPage } from 'src/features/users/usersSlice'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import StatusEditModal from './StatusEditModal'
import { showModal } from 'src/features/uiSlice'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import tableExample from '../idols/idolsDummy'
// const initialState = {
//   name: '',
//   email: '',
//   password: '',
//   profilePicUrl: '',
//   repeatPw: '',
// }
const Users = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const { isEditing, isLoading, name, email, password, profilePicUrl, repeatPw } = user

  // Handle pagination
  const { users, currentPage, totalSize, sizePerPage } = useSelector((store) => store.users)
  console.log(totalSize)

  const changeCurrentPage = (numPage) => {
    dispatch(updateCurrentPage(numPage))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(handleChangeInput({ [name]: value }))
  }

  useEffect(() => {
    dispatch(
      usersList({ type: 'users', limit: sizePerPage, offset: sizePerPage * (currentPage - 1) }),
    )
  }, [currentPage])

  // Handle form submit
  const onSubmit = (e) => {
    e.preventDefault()
    // const { name, email, password, repeatPw, profilePicUrl } = values
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
    <div>
      <h5>{isEditing ? 'Edit user' : 'Create an account'}</h5>
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
      <h5 className="form-padding">Users Listing</h5>
      <CCard>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>User</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Role</CTableHeaderCell>
                {/* <CTableHeaderCell>Country</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Price</CTableHeaderCell> */}
                <CTableHeaderCell className="text-center">status</CTableHeaderCell>
                <CTableHeaderCell className="text-center">More</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users?.map((user, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={user.profilePicUrl} status={user.status} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{user.name}</div>
                    <div className="small text-medium-emphasis">{user.email}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{user.roles[0].code}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton
                      color={user.status ? 'danger' : 'success'}
                      size="sm"
                      onClick={() =>
                        dispatch(
                          showModal({
                            title: 'Confirmation',
                            modalContent: <StatusEditModal id={user._id} />,
                          }),
                        )
                      }
                    >
                      {user.status ? 'Block User' : 'Active User'}
                    </CButton>
                  </CTableDataCell>
                  {/* <CTableDataCell>
                    <div>{item.country.name}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{item.price}</CTableDataCell> */}
                  <CTableDataCell>
                    <div className="text-center">
                      <CButton color="danger" size="sm">
                        Edit
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <div className="float-end margin-container">
            <Pagination
              currentPage={currentPage}
              totalSize={totalSize}
              theme="bootstrap"
              sizePerPage={sizePerPage}
              changeCurrentPage={changeCurrentPage}
              showFirstLastPages={true}
            />
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Users
