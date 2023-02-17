import React from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CAvatar,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CFormSelect,
} from '@coreui/react'
const SearchForm = () => {
  return (
    <>
      <div>
        <h5>Search Form</h5>
        <CCard>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={4}>
                <CFormLabel htmlFor="inputSearchIdol">Search Name</CFormLabel>
                <CFormInput type="text" id="inputSearchIdol" />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputIdolTitle">Idol title</CFormLabel>
                <CFormSelect aria-label="Default select example" id="inputIdolTitle">
                  <option>All</option>
                  <option value="1">Actor</option>
                  <option value="2">Actress</option>
                  <option value="3">Singer</option>
                  <option value="3">Streamer</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputSortIdol">Sort by</CFormLabel>
                <CFormSelect aria-label="Default select example" id="inputSortIdol">
                  <option>All</option>
                  <option value="1">Price (lowest)</option>
                  <option value="2">Price (highest)</option>
                  <option value="3">A-Z</option>
                  <option value="3">Z-A</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <div className="d-grid gap-2">
                  <CButton type="submit" color="danger">
                    Clear filters
                  </CButton>
                </div>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default SearchForm
