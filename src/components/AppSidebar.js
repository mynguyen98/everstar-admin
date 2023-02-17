import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import { toggleSidebar } from 'src/features/uiSlice'
import { toggleUnfoldable } from 'src/features/uiSlice'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import LogoEverstar from 'src/assets/brand/LogoEverstar'
import LogoStar from 'src/assets/brand/LogoStar'
// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.ui.unfoldable)
  const sidebarShow = useSelector((state) => state.ui.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      // onVisibleChange={(visible) => {
      //   dispatch(toggleSidebar(visible))
      // }}
    >
      <CSidebarBrand className="d-none d-md-flex trial" to="/">
        {!unfoldable ? <LogoEverstar /> : <LogoStar />}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler className="d-none d-lg-flex" onClick={() => dispatch(toggleUnfoldable())} /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
