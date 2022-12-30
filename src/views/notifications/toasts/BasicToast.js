import { CToast, CToastBody, CToastHeader } from '@coreui/react'

const BasicToast = (color, title, description) => (
  <CToast title="CoreUI for React.js">
    <CToastHeader closeButton>
      <svg
        className="rounded me-1"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
      >
        <rect width="100%" height="100%" fill={color}></rect>
      </svg>
      <strong className="me-auto">{title}</strong>
      {/* <small>7 min ago</small> */}
    </CToastHeader>
    <CToastBody>{description}</CToastBody>
  </CToast>
)

export default BasicToast
