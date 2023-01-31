import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { usersList, updateCurrentPage, setAddMMorePage } from 'src/features/users/usersSlice'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import StatusEditModal from './StatusEditModal'
import { showModal } from 'src/features/uiSlice'
import EditPassModal from './EditPassModal'
import AddUserForm from './AddUserForm'
import {
  CCard,
  CCardBody,
  CCol,
  CAvatar,
  CForm,
  CFormInput,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CTableBody,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilOptions, cilPlus } from '@coreui/icons'

const Users = () => {
  const dispatch = useDispatch()
  // search field
  const [searchName, setSearchName] = useState('')
  const handleChangeSearchName = (e) => {
    setSearchName(e.target.value)
    dispatch(setAddMMorePage(true))
    dispatch(updateCurrentPage(1))
  }
  // ////////////

  // Handle pagination
  const { users, currentPage, totalSize, sizePerPage } = useSelector((store) => store.users)

  const changeCurrentPage = (numPage) => {
    dispatch(updateCurrentPage(numPage))
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
                    {/* <CAvatar size="md" src={user.profilePicUrl} /> */}
                    <div className="avatar-container">
                      <img
                        src={user.profilePicUrl}
                        alt=""
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                    </div>
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
