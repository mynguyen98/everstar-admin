import React from 'react'
import { useState } from 'react'
import SweetPagination from 'sweetpagination'
import ModalsContainer from '../notifications/modals/ModalsContainer'
import EditIdolForm from './EditIdolForm'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import tableExample from './idolsDummy'
const IdolsList = () => {
  const [currentPageData, setCurrentPageData] = useState([])
  const [visible, setVisible] = useState(false)
  const items = tableExample
  return (
    <div className="margin-container">
      <h5>30 Idols found</h5>
      <CCard>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>Idol</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Title</CTableHeaderCell>
                <CTableHeaderCell>Country</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
                <CTableHeaderCell className="text-center">More</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentPageData.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.user.name}</div>
                    <div className="small text-medium-emphasis">
                      {/* <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '} */}
                      Registered:{item.user.registered}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{item.user.title}</CTableDataCell>
                  <CTableDataCell>
                    <div>{item.country.name}</div>
                    {/* <div className="clearfix">
                      <div className="float-start">
                        <strong>{item.usage.value}%</strong>
                      </div>
                      <div className="float-end">
                        <small className="text-medium-emphasis">{item.usage.period}</small>
                      </div>
                    </div>
                    <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{item.price}</CTableDataCell>
                  <CTableDataCell>
                    <div className="text-center">
                      <CButton color="danger" size="sm" onClick={() => setVisible(true)}>
                        Edit
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <div className="float-end margin-container">
            {/* <CPagination aria-label="Page navigation example">
              <CPaginationItem>Previous</CPaginationItem>
              <CPaginationItem>1</CPaginationItem>
              <CPaginationItem>2</CPaginationItem>
              <CPaginationItem>3</CPaginationItem>
              <CPaginationItem>Next</CPaginationItem>
            </CPagination> */}
            <SweetPagination
              currentPageData={setCurrentPageData}
              dataPerPage={10}
              getData={items}
              navigation={true}
              getStyle="style-2"
            />
          </div>
        </CCardBody>
      </CCard>
      <ModalsContainer
        visible={visible}
        setVisible={setVisible}
        modalContent={<EditIdolForm />}
        title={'Edit Idol information'}
      />
    </div>
  )
}

export default IdolsList
