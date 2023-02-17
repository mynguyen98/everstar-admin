import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsC,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  cilArrowBottom,
  cilArrowTop,
  cilOptions,
  cilPeople,
  cilUser,
  cilUserFollow,
} from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { concurrentUser } from 'src/features/cusers/cusersSlice'
import { useState, useEffect } from 'react'
const WidgetsUser = () => {
  const dispatch = useDispatch()
  // const [ccusers, setCCusers] = useState({})
  // const { ccusersAndroid, ccusersIos } = useSelector((store) => store.cusers.ccusers)
  // setInterval(() => {
  //   dispatch(concurrentUser({ version: '' }))
  // }, 10000)

  // get active user
  // useEffect(() => {
  //   setInterval(() => {
  //     dispatch(concurrentUser({ version: '' }))
  //   }, 5000)
  // }, [])
  return (
    <CRow>
      <CCol sm={3} lg={3}>
        <CWidgetStatsC
          color="info"
          icon={<CIcon icon={cilPeople} height={36} />}
          value="1000"
          title="Users"
          inverse
          progress={{ value: 100 }}
          className="mb-4"
        />
      </CCol>
      <CCol sm={3} lg={3}>
        <CWidgetStatsC
          color="success"
          icon={<CIcon icon={cilUser} height={36} />}
          value="1"
          title="Users active android"
          inverse
          progress={{ value: 100 }}
          className="mb-4"
        />
      </CCol>
      <CCol sm={3} lg={3}>
        <CWidgetStatsC
          color="primary"
          icon={<CIcon icon={cilUser} height={36} />}
          // value={`${ccusersIos}`}
          value="1"
          title="Users active ios"
          inverse
          progress={{ value: 100 }}
          className="mb-4"
        />
      </CCol>
      <CCol sm={3} lg={3}>
        <CWidgetStatsC
          color="warning"
          icon={<CIcon icon={cilUserFollow} height={36} />}
          value="300"
          title="Kols"
          inverse
          progress={{ value: 100 }}
          className="mb-4"
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsUser
