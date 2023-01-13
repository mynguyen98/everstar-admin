import React, { useState } from 'react'
import { CCard } from '@coreui/react'

const Menu = ({ item, itemPopup }) => {
  const [showMenu, setShowMenu] = useState(false)
  const handleToggleMenu = () => {
    setShowMenu((pre) => !pre)
  }
  return (
    <div className="options-menu">
      <div onClick={handleToggleMenu}>{item}</div>
      {showMenu ? <CCard className="menu-popup">{itemPopup}</CCard> : ''}
    </div>
  )
}

export default Menu
