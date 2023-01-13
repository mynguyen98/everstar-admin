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
import AddUserForm from './AddUserForm'
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
  // search field
  const [searchName, setSearchName] = useState('')
  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value)
    dispatch(setAddMMorePage(true))
    dispatch(updateCurrentPage(1))
  }
  // ////////////
  const { isEditing, isLoading, name, email, password, profilePicUrl, repeatPw } = user

  // Handle pagination
  const { users, currentPage, totalSize, sizePerPage } = useSelector((store) => store.users)

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
      usersList({
        type: 'users',
        limit: sizePerPage,
        offset: sizePerPage * (currentPage - 1),
        name: searchName,
      }),
    )
  }, [currentPage, searchName])

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
      <div className="row-align ">
        <h5 style={{ margin: '0' }}>Users Listing</h5>
        <CButton
          color="primary"
          shape="rounded-pill"
          variant="outline"
          onClick={() =>
            dispatch(
              showModal({
                title: `Add an account`,
                modalContent: <AddUserForm />,
                size: 'lg',
              }),
            )
          }
        >
          <span className="margin-left">Create an account</span>
          <CIcon icon={cilPlus} />
        </CButton>
      </div>
      <CCard>
        <CCardBody style={{ overflowY: 'visible' }}>
          <h6>Search form</h6>
          <CForm className="row g-3">
            <CCol md={4}>
              {/* <CFormLabel htmlFor="inputSearchUser">Name</CFormLabel> */}
              <CFormInput
                name="searchName"
                type="text"
                id="inputSearchUser"
                value={searchName}
                onChange={handleChangeSearchName}
                required
                placeholder="Search by name"
              />
            </CCol>
          </CForm>
          <CTable
            align="middle"
            className="mb-0 border margin-item"
            hover
            responsive
            style={{ overflowY: 'visible' }}
          >
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>User</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Role</CTableHeaderCell>
                {/* <CTableHeaderCell>Country</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Price</CTableHeaderCell> */}
                <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                {/* <CTableHeaderCell className="text-center">Edit password</CTableHeaderCell> */}
                <CTableHeaderCell className="text-center">More</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users?.map((user, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={user.profilePicUrl} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{user.name}</div>
                    <div className="small text-medium-emphasis">{user.email}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{user.roles[0].code}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton
                      color={user.status ? 'success' : 'danger'}
                      size="sm"
                      style={{ cursor: 'auto' }}
                    >
                      {user.status ? 'Active' : 'Block'}
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
                    <CDropdown>
                      <CDropdownToggle>
                        <CIcon icon={cilOptions} />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem
                          onClick={() =>
                            dispatch(
                              showModal({
                                title: `Edit ${user.name} password`,
                                modalContent: <EditPassModal id={user._id} />,
                              }),
                            )
                          }
                        >
                          Edit password
                        </CDropdownItem>
                        <CDropdownItem
                          onClick={() =>
                            dispatch(
                              showModal({
                                title: 'Confirmation',
                                modalContent: (
                                  <StatusEditModal
                                    id={user._id}
                                    text={user.status ? 'block' : 'active'}
                                  />
                                ),
                              }),
                            )
                          }
                        >
                          Edit Status
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
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
