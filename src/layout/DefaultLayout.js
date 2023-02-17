import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { concurrentUser } from 'src/features/cusers/cusersSlice'
import { setFoldable } from 'src/features/uiSlice'

const DefaultLayout = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   console.log('run interval')
  //   setInterval(() => {
  //     dispatch(concurrentUser({ version: '' }))
  //   }, 10000)
  // }, [])
  useEffect(() => {
    const handeResize = () => {
      if (window.innerWidth <= 1200) {
        dispatch(setFoldable(true))
      }
      if (window.innerWidth > 1200) {
        dispatch(setFoldable(false))
      }
    }
    window.addEventListener('resize', handeResize)
  }, [])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
