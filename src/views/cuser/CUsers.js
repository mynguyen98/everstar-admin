import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { usersList, updateCurrentPage, setAddMMorePage } from 'src/features/users/usersSlice'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import { showModal } from 'src/features/uiSlice'
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

const users = [
  {
    name: 'my xuoi',
    email: 'xuoi@gmail.com',
    profilePicUrl:
      'https://images.unsplash.com/photo-1555921015-5532091f6026?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    roles: [
      {
        code: 'GUEST',
      },
    ],
  },
  {
    name: 'my xuoi',
    email: 'xuoi@gmail.com',
    profilePicUrl:
      'https://images.unsplash.com/photo-1555921015-5532091f6026?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    roles: [
      {
        code: 'GUEST',
      },
    ],
  },
  {
    name: 'my xuoi',
    email: 'xuoi@gmail.com',
    profilePicUrl:
      'https://images.unsplash.com/photo-1555921015-5532091f6026?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    roles: [
      {
        code: 'GUEST',
      },
    ],
  },
  {
    name: 'my xuoi',
    email: 'xuoi@gmail.com',
    profilePicUrl:
      'https://images.unsplash.com/photo-1555921015-5532091f6026?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    roles: [
      {
        code: 'GUEST',
      },
    ],
  },
]

const CUsers = () => {
  return (
    <div>
      <div className="row-align ">
        <h5 style={{ margin: '0' }}>Users</h5>
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
                    <CButton color={'success'} size="sm" style={{ cursor: 'auto' }}>
                      Active
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
                    <CDropdown>
                      <CDropdownToggle>
                        <CIcon icon={cilOptions} />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem>Edit password</CDropdownItem>
                        <CDropdownItem>Edit Status</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <div className="float-end margin-container">
            {/* <Pagination
              currentPage={currentPage}
              totalSize={totalSize}
              theme="bootstrap"
              sizePerPage={sizePerPage}
              changeCurrentPage={changeCurrentPage}
              showFirstLastPages={true}
            /> */}
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}
export default CUsers
