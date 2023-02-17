import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showModal, showModal2, closeModal } from 'src/features/uiSlice'
import CreateSubForm from './CreateSubForm'
import SubsListing from './SubsListing'
import CKolsListing from './CKolsListing'
import { createKol } from 'src/features/kols/kolsSlice'
import { getImageLink } from 'src/utils/resource'
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
  CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import FileBase64 from 'react-file-base64'
import { cilPlus } from '@coreui/icons'
const initialState = {
  name: '',
  userId: '',
  images: [],
  career: '',
  rank: '',
  order: 0,
  subscriptionId: '',
  status: false,
  intro: '',
}

const CreateKolForm = () => {
  // const { name, email, title, country, price, address } = useSelector((store) => store.kols)
  const dispatch = useDispatch()
  const { nearlyCreatedSubId } = useSelector((store) => store.subs)
  const [kol, setKol] = useState(initialState)
  const [subName, setSubName] = useState('No subscription chosen')
  const [listingFile, setListingFile] = useState([])
  const [ckolName, setCkolName] = useState('No Kol chosen')
  const [formData, setFormData] = useState(new FormData())
  const handleChange = (e) => {
    const name = e.target.name
    let value
    if (name === 'status') {
      value = Boolean(e.target.value)
    } else if (name === 'order') {
      value = Number(e.target.value)
    } else {
      value = e.target.value
    }
    if (name === 'images') {
      // // console.log(e)
      const value = e.target.files
      const files = [...value]
      setListingFile(files)
      // const reader = new FileReader()
      // reader.onload = function (e) {
      //   // binary data
      //   console.log(e.target.result)
      //   setFormData((prev) => prev.append('images', e.target.result))
      //   // formData.append('image', e.target.result)
      // }
      // reader.onerror = function (e) {
      //   // error occurred
      //   console.log('Error : ' + e.type)
      // }
      // files.forEach((item, index) => {
      //   reader.readAsBinaryString(item)
      // })
    } else {
      setKol({ ...kol, [name]: value })
    }
  }
  const handleChangeSubId = (id) => {
    setKol({ ...kol, subscriptionId: id })
  }
  const handleChangeUserId = (id) => {
    setKol({ ...kol, userId: id })
  }

  //handle get images link
  useEffect(() => {
    const imagesList = listingFile.map((item) => {
      return item.base64
    })
    setKol({ ...kol, images: imagesList })
  }, [listingFile])
  //handle get images link

  useEffect(() => {
    if (!nearlyCreatedSubId) return
    setKol({ ...kol, subscriptionId: nearlyCreatedSubId })
  }, [nearlyCreatedSubId])
  const onSubmitKol = (e) => {
    e.preventDefault()
    dispatch(createKol(kol))
  }
  console.log(listingFile)

  return (
    <div>
      <CCard>
        <CCardBody>
          <CForm className="row g-3" onSubmit={onSubmitKol}>
            <CCol md={6}>
              <CFormLabel htmlFor="inputNameKol">Name</CFormLabel>
              <CFormInput
                type="text"
                id="inputNameKol"
                name="name"
                value={kol.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputCareerKol">Career</CFormLabel>
              <CFormInput
                type="text"
                id="inputCareerKol"
                value={kol.career}
                name="career"
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol
              md={6}
              className="main-border"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <CFormLabel htmlFor="inputKolImages">Input image url</CFormLabel>
              <CFormInput
                type="file"
                id="inputKolImages"
                // value={kol.images[0]}
                name="images"
                onChange={handleChange}
                required
                multiple
              />
            </CCol>

            <CCol md={6}>
              <CFormLabel htmlFor="inputKolRank">Rank</CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                name="rank"
                onChange={handleChange}
                required
              >
                {/* <option>--</option> */}
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </CFormSelect>
            </CCol>

            <CCol xs={6}>
              <CFormLabel htmlFor="inputStatusCreateKol">Choose Status</CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                name="status"
                onChange={handleChange}
                required
              >
                {/* <option>--</option> */}
                <option value={true}>True</option>
                <option value={false}>False</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputOrderCreateKol">Order</CFormLabel>
              <CFormInput
                type="number"
                id="inputOrderCreateKol"
                value={kol.order}
                placeholder="input the order number"
                name="order"
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="inputSubcriptionId">
                Choose Subcription or create a new one
              </CFormLabel>
              <div className="row-align">
                <CCol className="relative focus-display">
                  <div
                    className="choose-fields"
                    onClick={() => {
                      dispatch(
                        showModal2({
                          title: 'Choose subscription',
                          modalContent: (
                            <SubsListing
                              handleChangeSubId={handleChangeSubId}
                              setSubName={setSubName}
                            />
                          ),
                          size: 'md',
                        }),
                      )
                    }}
                  >
                    <CButton shape="rounded-0">Choose subscription</CButton>
                    <span style={{ paddingLeft: '8px' }}>{subName}</span>
                  </div>
                </CCol>
                <CCol>
                  <CButton
                    color="primary"
                    shape="rounded-pill"
                    variant="outline"
                    onClick={() => {
                      dispatch(
                        showModal2({
                          title: 'Create a new subscription',
                          modalContent: <CreateSubForm />,
                          size: 'md',
                        }),
                      )
                    }}
                  >
                    <span className="margin-left">Create new subscription</span>
                    <CIcon icon={cilPlus} />
                  </CButton>
                </CCol>
              </div>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputUserId">Choose KOL</CFormLabel>
              <div className="row-align">
                <CCol className="relative focus-display">
                  <div
                    className="choose-fields"
                    id="inputUserId"
                    onClick={() => {
                      dispatch(
                        showModal2({
                          title: 'Choose KOL',
                          modalContent: (
                            <CKolsListing
                              handleChangeUserId={handleChangeUserId}
                              setCkolName={setCkolName}
                            />
                          ),
                          size: 'md',
                        }),
                      )
                    }}
                  >
                    <CButton shape="rounded-0">Choose KOL</CButton>
                    <span style={{ paddingLeft: '8px' }}>{ckolName}</span>
                  </div>
                </CCol>
              </div>
            </CCol>

            {/* <CCol xs={6}>
              <CButton color="primary" shape="rounded-pill" variant="outline">
                <span className="margin-left">Create Kol</span>
                <CIcon icon={cilPlus} />
              </CButton>
            </CCol> */}
            <CCol xs={12}>
              <CFormLabel htmlFor="introforCreateKol">KOL introduction</CFormLabel>
              <CFormTextarea
                id="introforCreateKol"
                rows="3"
                value={kol.intro}
                name="intro"
                onChange={handleChange}
                required
              ></CFormTextarea>
            </CCol>
            <CModalFooter>
              <CButton color="secondary">Clear all</CButton>
              <CButton type="submit">Create Kol</CButton>
            </CModalFooter>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default CreateKolForm
