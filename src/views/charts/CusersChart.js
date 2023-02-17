import React from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChartDoughnut, CChartLine } from '@coreui/react-chartjs'
import { useSelector } from 'react-redux'
import { getStyle, hexToRgba } from '@coreui/utils'
//chartjs

const CusersChart = () => {
  const { ccusersAndroid, ccusersIos, labels } = useSelector((store) => store.cusers.ccusers)
  console.log(labels)
  return (
    <CRow>
      <CCol lg={9} sm={12}>
        <CCard className="mb-4">
          <CCardHeader>Users concurrent </CCardHeader>
          <CCardBody>
            <CChartLine
              // style={{ height: '300px', marginTop: '40px' }}
              data={{
                labels: labels,
                datasets: [
                  {
                    label: 'Android',
                    backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                    borderColor: getStyle('--cui-info'),
                    pointHoverBackgroundColor: getStyle('--cui-info'),
                    borderWidth: 2,
                    data: ccusersAndroid,
                  },
                  {
                    label: 'IOS',
                    backgroundColor: 'transparent',
                    borderColor: getStyle('--cui-success'),
                    pointHoverBackgroundColor: getStyle('--cui-success'),
                    borderWidth: 2,
                    data: ccusersIos,
                  },
                ],
              }}
              options={{
                animation: false,
                maintainAspectRatio: true,
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      // maxTicksLimit: 5,
                      // stepSize: 20,
                      // max: 100,
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.1,
                  },
                  point: {
                    // radius: 1,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg={3} sm={6}>
        <CCard className="mb-4">
          <CCardHeader>Users concurrent </CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={{
                labels: ['Android', 'IOS'],
                datasets: [
                  {
                    backgroundColor: ['#41B883', '#321fdb'],
                    data: [ccusersAndroid[0], ccusersIos[0]],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CusersChart
