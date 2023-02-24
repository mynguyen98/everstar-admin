import React from 'react'
import SearchForm from './SearchForm'
import IdolsList from './KolsList'
import { AppBreadcrumb } from 'src/components'
const Idols = () => {
  return (
    <div>
      {/* <SearchForm /> */}
      <AppBreadcrumb />
      <IdolsList />
    </div>
  )
}

export default Idols
