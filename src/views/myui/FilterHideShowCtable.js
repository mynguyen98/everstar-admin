import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilFilter } from '@coreui/icons'
import { CFormCheck } from '@coreui/react'
import { useEffect, useRef, useState } from 'react'
const FilterHideShowCtable = ({ content }) => {
  const ref = useRef()
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isOpenMenu &&
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target.classList.contains('toggle-button-dropdown')
      ) {
        setIsOpenMenu(!isOpenMenu)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isOpenMenu])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '0.75rem',
        cursor: 'pointer',
      }}
      className="dropdown-wrapper"
    >
      <CIcon
        size="lg"
        icon={cilFilter}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        className="toggle-button-dropdown"
      />
      {isOpenMenu && (
        <ul className="items-dropdown" ref={ref}>
          {content}
        </ul>
      )}
    </div>
  )
}

export default FilterHideShowCtable
