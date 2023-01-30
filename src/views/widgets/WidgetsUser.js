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

const WidgetsUser = () => {
  return (
    <CRow>
      <CCol sm={4} lg={4}>
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
      <CCol sm={4} lg={4}>
        <CWidgetStatsC
          color="success"
          icon={<CIcon icon={cilUser} height={36} />}
          value="500"
          title="Users active"
          inverse
          progress={{ value: 100 }}
          className="mb-4"
        />
      </CCol>
      <CCol sm={4} lg={4}>
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
