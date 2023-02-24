import React, { useEffect } from 'react'
import { AppBreadcrumb } from 'src/components'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilOptions, cilPlus } from '@coreui/icons'
import NoSearchFound from '../myui/NoSearchFound'
import { formatCurrency } from 'src/utils/helpers'
import Pagination from 'react-pagination-js'
import { updateCurrentPage, listingSubs } from 'src/features/subs/subsPageSlice'
import CreateSubForm from '../kols/CreateSubForm'
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
import { useDispatch, useSelector } from 'react-redux'
const SubsListing = () => {
  const dispatch = useDispatch()
  const { subs, currentPage, totalSize, sizePerPage } = useSelector((store) => store.subsPage)

  const changeCurrentPage = (numPage) => {
    dispatch(updateCurrentPage(numPage))
  }
  useEffect(() => {
    dispatch(
      listingSubs({
        limit: sizePerPage,
        offset: sizePerPage * (currentPage - 1),
      }),
    )
  }, [currentPage])

  return (
    <div>
      <AppBreadcrumb />
      <div className="row-align ">
        <h5 style={{ margin: '0' }}>Users Listing</h5>
        <CButton
          color="primary"
          shape="rounded-pill"
          variant="outline"
          onClick={() => {
            dispatch(
              showModal({
                title: 'Create a new subscription',
                modalContent: <CreateSubForm />,
                size: 'md',
              }),
            )
          }}
        >
          <span className="margin-left">Create subscription</span>
          <CIcon icon={cilPlus} />
        </CButton>
      </div>
      <CCard>
        <CCardBody style={{ overflowY: 'visible' }}>
          {/* <h6>Search form</h6> */}

          <CTable
            align="middle"
            className="mb-0 border margin-item"
            hover
            responsive
            style={{ overflowY: 'visible' }}
          >
            <CTableHead color="light">
              <CTableRow>
                {/* <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell> */}
                <CTableHeaderCell className="text-center">User</CTableHeaderCell>

                {/* <CTableHeaderCell className="text-center">Role</CTableHeaderCell> */}

                <CTableHeaderCell className="text-center">Sub id</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Android product</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Ios product</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Status</CTableHeaderCell>

                <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {subs?.map((sub, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  {/* <CTableDataCell className="text-center">
                    <div className="avatar-container center-element">
                      <img
                        src={sub.profilePicUrl}
                        alt=""
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                    </div>
                  </CTableDataCell> */}
                  <CTableDataCell className="text-center text-primary">
                    <h6>{sub.name}</h6>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{sub._id}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{sub.product.android}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{sub.product.ios}</div>
                  </CTableDataCell>
                  {/* <CTableDataCell className="text-center">{sub.roles[0].code}</CTableDataCell> */}
                  <CTableDataCell className="text-center">
                    <CButton
                      color={sub.status ? 'success' : 'danger'}
                      size="sm"
                      style={{ cursor: 'auto' }}
                    >
                      {sub.status ? 'Active' : 'Block'}
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
                    <h6 style={{ color: '#f9b115' }}>{formatCurrency(sub.price)}</h6>
                    {/* <CDropdown>
                      <CDropdownToggle>
                        <CIcon icon={cilOptions} />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem>Edit password</CDropdownItem>
                        <CDropdownItem>Edit Status</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown> */}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          {/* {subs.length === 0 ? <NoSearchFound title="users" /> : ''} */}
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

export default SubsListing
