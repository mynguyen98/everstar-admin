import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { cusersList, updateCurrentPage, setAddMMorePage } from 'src/features/cusers/cusersSlice'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import { showModal } from 'src/features/uiSlice'
import SetToKolModal from './SetToKolModal'
import ToggleBannedCuser from './ToggleBannedCuser'
import NoSearchFound from '../myui/NoSearchFound'
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
  CFormLabel,
  CFormSelect,
  CSpinner,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilOptions, cilPlus } from '@coreui/icons'
import KolIcon from '../icons/everstarIcon/Kol'

const initialSearchFields = {
  nameSearch: '',
  emailSearch: '',
  isBanndedSearch: '',
  titleSearch: '',
}
const CUsers = () => {
  const dispatch = useDispatch()
  const [searchFields, setSearchFields] = useState(initialSearchFields)
  const { isLoading, cusers, currentPage, totalSize, sizePerPage } = useSelector(
    (store) => store.cusers,
  )
  const changeCurrentPage = (numPage) => {
    dispatch(updateCurrentPage(numPage))
  }
  const handleResetPagination = () => {
    dispatch(setAddMMorePage(true))
    dispatch(updateCurrentPage(1))
  }
  const handleChangeSearchField = (e) => {
    const name = e.target.name
    const value = e.target.value
    setSearchFields({ ...searchFields, [name]: value })
  }
  const handleListUser = () => {
    dispatch(
      cusersList({
        type: 'cusers',
        limit: sizePerPage,
        offset: sizePerPage * (currentPage - 1),
        email: searchFields.emailSearch,
        name: searchFields.nameSearch,
        isBanned: searchFields.isBanndedSearch,
        isKol: searchFields.titleSearch,
      }),
    )
  }
  const handleSubmitSearchFields = (e) => {
    e.preventDefault()
    handleListUser()
    handleResetPagination()
  }
  const clearSearchFields = () => {
    handleResetPagination()
    setSearchFields({ ...initialSearchFields })
  }
  useEffect(() => {
    handleListUser()
  }, [currentPage])
  console.log(currentPage)
  console.log(searchFields)
  return (
    <div>
      <div className="row-align ">
        <h5 style={{ margin: '0' }}>Users</h5>
      </div>
      <CCard>
        <CCardBody style={{ overflowY: 'visible' }}>
          <CAccordion className="accordion-normal">
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>
                <h5>Search form</h5>
              </CAccordionHeader>
              <CAccordionBody>
                <CForm className="row g-3">
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputSearchCuser">Name</CFormLabel>
                    <CFormInput
                      name="nameSearch"
                      type="text"
                      id="inputSearchCuser"
                      placeholder="Input name"
                      onChange={handleChangeSearchField}
                      value={searchFields.nameSearch}
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputSearchCuserEmail">Search by email</CFormLabel>
                    <CFormInput
                      name="emailSearch"
                      type="text"
                      id="inputSearchCuserEmail"
                      placeholder="Input email"
                      onChange={handleChangeSearchField}
                      value={searchFields.emailSearch}
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputSearchCuserBanned">Banned</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name="isBanndedSearch"
                      id="inputSearchCuserBanned"
                      onChange={handleChangeSearchField}
                      value={searchFields.isBanndedSearch}
                    >
                      <option value="">None</option>
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="inputSearchCuserTitle">Title</CFormLabel>
                    <CFormSelect
                      aria-label="Default select example"
                      name="titleSearch"
                      id="inputSearchCuserTitle"
                      onChange={handleChangeSearchField}
                      value={searchFields.titleSearch}
                    >
                      <option value="">None</option>
                      <option value={true}>KOL</option>
                      <option value={false}>User</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>Clear search fields</CFormLabel>
                    <div className="d-grid">
                      <CButton
                        color="danger"
                        onClick={clearSearchFields}
                        // size="sm"
                        className="normal"
                      >
                        Clear fields
                      </CButton>
                    </div>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>Submit search</CFormLabel>
                    <div className="d-grid">
                      <CButton
                        color="primary"
                        onClick={handleSubmitSearchFields}
                        // size="sm"
                        className="normal"
                      >
                        Submit
                      </CButton>
                    </div>
                  </CCol>
                </CForm>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
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
                <CTableHeaderCell className="text-center">UserId</CTableHeaderCell>

                <CTableHeaderCell className="text-center">User name</CTableHeaderCell>

                <CTableHeaderCell className="text-center">Status</CTableHeaderCell>

                <CTableHeaderCell className="text-center">More</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {!isLoading ? (
              <CTableBody>
                {cusers?.map((user, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center ">
                      {/* <CAvatar size="md" src={user.avatarURL} /> */}
                      {/* // style={{ backgroundImage: `url(${user.profilePicUrl})` }} */}
                      <div className="avatar-container center-element">
                        <img
                          src={user.avatarURL}
                          alt="avatar"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>
                        {user.displayName} {user.kol ? <KolIcon /> : ''}
                      </div>
                      <div className="small text-medium-emphasis">{user.email}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{user.id}</CTableDataCell>

                    <CTableDataCell className="text-center">{user.username}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        color={user.banned ? 'danger' : 'success'}
                        size="sm"
                        style={{ cursor: 'auto' }}
                      >
                        {user.banned ? 'Banned' : 'Active'}
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
                      <CDropdown>
                        <CDropdownToggle>
                          <CIcon icon={cilOptions} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          {/* <CDropdownItem>Edit password</CDropdownItem> */}
                          <CDropdownItem
                            onClick={() => {
                              dispatch(
                                showModal({
                                  title: `Confirmation`,
                                  modalContent: (
                                    <ToggleBannedCuser
                                      name={user.displayName}
                                      id={user.id}
                                      isBanned={user.banned}
                                    />
                                  ),
                                }),
                              )
                            }}
                          >
                            Toggle banned
                          </CDropdownItem>
                          {!user.kol ? (
                            <CDropdownItem
                              onClick={() => {
                                dispatch(
                                  showModal({
                                    title: `Confirmation`,
                                    modalContent: (
                                      <SetToKolModal name={user.displayName} id={user.id} />
                                    ),
                                  }),
                                )
                              }}
                            >
                              Set to Kol
                            </CDropdownItem>
                          ) : (
                            ''
                          )}
                          {/* <CDropdownItem
                          onClick={() => {
                            dispatch(
                              showModal({
                                title: `Confirmation`,
                                modalContent: (
                                  <SetToKolModal name={user.displayName} id={user.id} />
                                ),
                              }),
                            )
                          }}
                        >
                          set to Kol
                        </CDropdownItem> */}
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            ) : (
              <CSpinner color="primary" className="item-center" />
            )}
          </CTable>
          {cusers.length === 0 ? <NoSearchFound title="users" /> : ''}
          {totalSize > sizePerPage ? (
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
          ) : (
            ''
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}
export default CUsers
