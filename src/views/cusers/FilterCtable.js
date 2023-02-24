import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeInput } from 'src/features/user/userSlice'
import { setColumnsControl } from 'src/features/cusers/cusersSlice'

const FilterCtable = () => {
  const columnsControl = useSelector((store) => store.cusers.columnsControl)
  const dispatch = useDispatch()
  const handleChangeInput = (e) => {
    const name = e.target.name
    const value = e.target.checked
    dispatch(setColumnsControl({ name: name, value: value }))
  }
  console.log(columnsControl)
  return (
    <>
      <li>
        <input
          type="checkbox"
          id="cuserUserIdColumn"
          name="userId"
          value={columnsControl.userId}
          onChange={handleChangeInput}
          checked={columnsControl.userId}
        />
        <label htmlFor="cuserUserIdColumn">User Id</label>
        <br></br>
      </li>
      <li>
        <input
          type="checkbox"
          id="cuserUserNameColumn"
          name="userName"
          value={columnsControl.userName}
          onChange={handleChangeInput}
          checked={columnsControl.userName}
        />
        <label htmlFor="cuserUserNameColumn">User Name</label>
      </li>
      <li>
        <input
          type="checkbox"
          id="cuserStatusColumn"
          name="status"
          value={columnsControl.status}
          onChange={handleChangeInput}
          checked={columnsControl.status}
        />
        <label htmlFor="cuserStatusColumn">Status</label>
      </li>
    </>
  )
}

export default FilterCtable
