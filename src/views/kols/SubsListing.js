import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentPage } from 'src/features/subs/subsSlice'
import { listingSubs } from 'src/features/subs/subsSlice'
import Pagination from 'react-pagination-js'
import { formatCurrency } from 'src/utils/helpers'
import { closeModal2 } from 'src/features/uiSlice'
const SubsListing = ({ handleChangeSubId, setSubName }) => {
  const dispatch = useDispatch()

  const { subs, currentPage, totalSize, sizePerPage } = useSelector((store) => store.subs)
  const changeCurrentPage = (numPage) => {
    dispatch(updateCurrentPage(numPage))
  }

  useEffect(() => {
    dispatch(
      listingSubs({
        limit: sizePerPage,
        offset: sizePerPage * (currentPage - 1),
      }),
    )
  }, [currentPage])
  return (
    <div className="list-container">
      <ul className="items-listing">
        {subs.map((item) => (
          <li
            key={item._id}
            className="each-item"
            onClick={() => {
              handleChangeSubId(item._id)
              setSubName(item.name)
              // setDisplay(false)
              dispatch(closeModal2())
            }}
          >
            <div>{item.name}</div>
            <div style={{ color: '#f9b115' }}>{formatCurrency(item.price)}</div>
          </li>
        ))}
      </ul>
      <div className="float-end margin-container">
        <Pagination
          currentPage={currentPage}
          totalSize={totalSize}
          theme="bootstrap"
          sizePerPage={sizePerPage}
          changeCurrentPage={changeCurrentPage}
          showFirstLastPages={true}
        />
      </div>
    </div>
  )
}

export default SubsListing
