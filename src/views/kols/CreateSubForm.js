import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showModal, showModal2 } from 'src/features/uiSlice'
import { createSub } from 'src/features/subs/subsSlice'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CAvatar,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CFormTextarea,
  CFormSelect,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
const initialState = {
  name: '',
  price: '',
  product: {
    ios: '',
    android: '',
  },
  benefit: '',
}
const CreateSubForm = () => {
  // const { name, email, title, country, price, address } = useSelector((store) => store.subs)
  const dispatch = useDispatch()
  const [sub, setSub] = useState(initialState)

  // Handle form submit
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createSub(sub))
  }

  // handle form change
  const handleChange = (e) => {
    const name = e.target.name
    let value = e.target.value
    if (name === 'ios') {
      const newProduct = {
        ...sub.product,
        ios: value,
      }
      setSub({ ...sub, product: newProduct })
    } else if (name === 'android') {
      const newProduct = {
        ...sub.product,
        android: value,
      }
      setSub({ ...sub, product: newProduct })
    } else if (name === 'price') {
      const newValue = Number(value)
      setSub({ ...sub, [name]: newValue })
    } else {
      setSub({ ...sub, [name]: value })
    }
  }

  const clearFields = () => {
    setSub({ ...initialState })
  }
  console.log(sub)
  return (
    <div>
      <CCard>
        <CCardBody>
          <CForm className="row g-3" onSubmit={onSubmit}>
            <CCol md={6}>
              <CFormLabel htmlFor="inputNameKol">Name</CFormLabel>
              <CFormInput
                type="text"
                id="inputNameKol"
                name="name"
                value={sub.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPriceCreateSub">Price</CFormLabel>
              <CFormInput
                type="number"
                id="inputPriceCreateSub"
                value={sub.price}
                name="price"
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputIosProductSub">IOS product</CFormLabel>
              <CFormInput
                type="text"
                id="inputIosProductSub"
                value={sub.product.ios}
                name="ios"
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputAndroidProductSub">Android product</CFormLabel>
              <CFormInput
                type="text"
                id="inputAndroidProductSub"
                value={sub.product.android}
                name="android"
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="benefitForCreateSub">Benefit</CFormLabel>
              <CFormTextarea
                id="benefitForCreateSub"
                rows="3"
                name="benefit"
                value={sub.benefit}
                onChange={handleChange}
                required
              ></CFormTextarea>
            </CCol>

            <CModalFooter>
              <CButton color="secondary" onClick={clearFields}>
                Clear all
              </CButton>
              <CButton type="submit">Create Subscription</CButton>
            </CModalFooter>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default CreateSubForm
