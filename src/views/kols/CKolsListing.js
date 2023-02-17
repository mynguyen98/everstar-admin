// KOLS list in create kol form to select KOL.
import React, { useEffect, useState } from 'react'
import Pagination from 'react-pagination-js'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentPage, setAddMMorePage } from 'src/features/cusers/ckolsSlice'
import { ckolsList } from 'src/features/cusers/ckolsSlice'
import { closeModal2 } from 'src/features/uiSlice'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
} from '@coreui/react'
const initialSearchFields = {
  nameSearch: '',
  emailSearch: '',
}
const CKolsListing = ({ handleChangeUserId, setCkolName }) => {
  const dispatch = useDispatch()
  const [searchFields, setSearchFields] = useState(initialSearchFields)
  const { ckols, currentPage, totalSize, sizePerPage } = useSelector((store) => store.ckols)
  const changeCurrentPage = (numPage) => {
    dispatch(updateCurrentPage(numPage))
  }
  const handleChangeSearchField = (e) => {
    const name = e.target.name
    const value = e.target.value
    setSearchFields({ ...searchFields, [name]: value })
    dispatch(setAddMMorePage(true))
    dispatch(updateCurrentPage(1))
  }
  console.log(currentPage, totalSize, sizePerPage)
  useEffect(() => {
    dispatch(
      ckolsList({
        type: 'ckols',
        limit: sizePerPage,
        offset: sizePerPage * (currentPage - 1),
        isKol: true,
        name: searchFields.nameSearch,
        email: searchFields.emailSearch,
      }),
    )
  }, [currentPage, searchFields])
  console.log(searchFields)
  return (
    <div className="list-container">
      <CAccordion className="accordion-small" style={{ 'accordion-body-padding-y': 8 }}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>
            <h6>Search form</h6>
          </CAccordionHeader>
          <CAccordionBody style={{ padding: '12px 16px' }}>
            <CForm className="row g-3">
              <CCol sm={6}>
                <CFormInput
                  name="nameSearch"
                  type="text"
                  id="inputSearchCuserForCreateKol"
                  placeholder="Search by name"
                  onChange={handleChangeSearchField}
                  value={searchFields.nameSearch}
                />
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  name="emailSearch"
                  type="text"
                  id="inputSearchEmailCuserForCreateKol"
                  placeholder="Search by email"
                  value={searchFields.emailSearch}
                  onChange={handleChangeSearchField}
                />
              </CCol>
            </CForm>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      <ul className="items-listing">
        {ckols.map((item, index) => {
          return (
            <li
              key={item.id}
              className="each-item space-between"
              onClick={() => {
                handleChangeUserId(item.id)
                setCkolName(item.displayName)
                dispatch(closeModal2())
              }}
            >
              <div className="avatar-container">
                <img
                  src={item.avatarURL}
                  alt=""
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
                <span style={{ paddingLeft: '4px' }}>{item.displayName}</span>
              </div>
              <div>{item.email}</div>
            </li>
          )
        })}
      </ul>
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
    </div>
  )
}

export default CKolsListing
