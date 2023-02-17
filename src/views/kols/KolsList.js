import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import ModalsContainer from '../notifications/modals/ModalsContainer'
import { showModal } from 'src/features/uiSlice'
import EditKolForm from './EditKolForm'
import CreateKolForm from './CreateKolForm'
import kolSlice, { setEditKol } from 'src/features/kols/kolsSlice'
import Pagination from 'react-pagination-js'
import 'react-pagination-js/dist/styles.css' // import css
import {
  isLoading,
  listingKols,
  updateCurrentPage,
  setAddMMorePage,
} from 'src/features/kols/kolsSlice'
import { listingSubs } from 'src/features/subs/subsSlice'
import { formatCurrency } from 'src/utils/helpers'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilPlus } from '@coreui/icons'
const KolsList = () => {
  const dispatch = useDispatch()

  const { isLoading, kols, currentPage, totalSize, sizePerPage } = useSelector(
    (store) => store.kols,
  )
  const changeCurrentPage = (numPage) => {
    dispatch(updateCurrentPage(numPage))
  }
  useEffect(() => {
    dispatch(
      listingKols({
        limit: sizePerPage,
        offset: sizePerPage * (currentPage - 1),
      }),
    )
  }, [currentPage])
  return (
    <div>
      <div>
        <div className="row-align">
          <h5>Kols listing</h5>
          <CButton
            color="primary"
            shape="rounded-pill"
            variant="outline"
            onClick={() => {
              dispatch(
                showModal({
                  title: 'Create a new Kol',
                  modalContent: <CreateKolForm />,
                  size: 'xl',
                }),
              )
            }}
          >
            <span className="margin-left">Create Kol</span>
            <CIcon icon={cilPlus} />
          </CButton>
        </div>
        <CCard>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Kol</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Title</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Rank</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
                  {/* <CTableHeaderCell className="text-center">More</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              {!isLoading ? (
                <CTableBody>
                  {kols.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.images[0]} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <p>{item.name}</p>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{item.career}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.rank}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <p className="warning-color">{formatCurrency(item.subscriptionId.price)}</p>
                      </CTableDataCell>
                      {/* <CTableDataCell>
                        <p className="text-center">
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => {
                              dispatch(
                                showModal({
                                  title: 'Edit Kol information',
                                  modalContent: <EditKolForm />,
                                  size: 'xl',
                                }),
                              )
                              dispatch(
                                setEditKol({
                                  name: item.user.name,
                                  email: 'canhmy1998@gmail.com',
                                  title: item.user.title,
                                  country: item.country.name,
                                  price: item.price,
                                  address: 'abc district, cde city',
                                }),
                              )
                            }}
                          >
                            Edit
                          </CButton>
                        </p>
                      </CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              ) : (
                <CSpinner color="primary" className="item-center" />
              )}
            </CTable>
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
    </div>
  )
}

export default KolsList
