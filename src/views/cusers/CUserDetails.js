import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { AppBreadcrumb } from 'src/components'
import { CSpinner, CCard, CCardBody, CCol, CButton } from '@coreui/react'
import KolIcon from '../icons/everstarIcon/Kol'
import { formatDate } from 'src/utils/helpers'
import { avatarLink } from 'src/utils/helpers'
import { getSpecificCuser } from 'src/features/cusers/cusersSlice'
import { showModal } from 'src/features/uiSlice'
import ToggleBannedCuser from './ToggleBannedCuser'
import { updateCuserDetail } from 'src/features/cusers/cusersSlice'
import SetToKolModal from './SetToKolModal'

const CUserDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  // const [userDetail, setUserDetail] = useState([])
  // const cusers = useSelector((store) => store.cusers.cusers)
  const { cuser, isLoading } = useSelector((store) => {
    console.log(store.cusers.cuserDetail)
    return store.cusers.cuserDetail
  })
  // useEffect(() => {
  //   const userFind = cusers.find((user) => user.id === params.id)
  //   setUserDetail(userFind)
  // }, [])
  console.log(params.id)
  useEffect(() => {
    dispatch(
      getSpecificCuser({
        limit: 10,
        offset: 0,
        email: params.id,
      }),
    )
  }, [])
  // console.log(cusers)
  // console.log(params)
  console.log(cuser)
  if (isLoading) {
    return (
      <div>
        <CSpinner color="primary" />
      </div>
    )
  }
  return (
    <div>
      <AppBreadcrumb details={cuser?.displayName} />
      <div className="row g-2">
        <CCol md={4}>
          <CCard>
            <CCardBody className="text-center pt-4">
              <img
                src={cuser.avatarURL ? cuser.avatarURL : avatarLink(cuser.displayName)}
                alt=""
                className="avatar-detail"
              />
              <h5 className="pt-2">
                {cuser.displayName}
                {cuser.kol ? <KolIcon /> : ''}
              </h5>
              <div>
                <CButton
                  color={cuser.banned ? 'success' : 'danger'}
                  className="m-2"
                  onClick={() => {
                    dispatch(
                      showModal({
                        title: `Confirmation`,
                        modalContent: (
                          <ToggleBannedCuser
                            name={cuser.displayName}
                            id={cuser.id}
                            isBanned={cuser.banned}
                            updateUserDetail={true}
                          />
                        ),
                      }),
                    )
                    // dispatch(updateCuserDetail(cuser.banned))
                  }}
                >
                  {cuser.banned ? 'Unban' : 'Ban'}
                </CButton>
                {!cuser.kol ? (
                  <CButton
                    color="primary"
                    onClick={() => {
                      dispatch(
                        showModal({
                          title: `Confirmation`,
                          modalContent: (
                            <SetToKolModal
                              name={cuser.displayName}
                              id={cuser.id}
                              kol={cuser.kol}
                              updateUserDetail={true}
                            />
                          ),
                        }),
                      )
                    }}
                  >
                    Set to Kol
                  </CButton>
                ) : (
                  ''
                )}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={8}>
          <CCard>
            <ul className="p-3 m-0">
              <li className="row border-bottom py-3">
                <CCol xs={4}>
                  <h6 className="m-0">Full name </h6>
                </CCol>
                <CCol xs={8}>
                  <span>{cuser.displayName}</span>
                </CCol>
              </li>
              <li className="row border-bottom py-3">
                <CCol xs={4}>
                  <h6 className="m-0">User name </h6>
                </CCol>
                <CCol xs={8}>
                  <span>{cuser.username}</span>
                </CCol>
              </li>
              <li className="row border-bottom py-3">
                <CCol xs={4}>
                  <h6 className="m-0">Email </h6>
                </CCol>
                <CCol xs={8}>
                  <span>{cuser.email}</span>
                </CCol>
              </li>
              <li className="row border-bottom py-3">
                <CCol xs={4}>
                  <h6 className="m-0">Google Id </h6>
                </CCol>
                <CCol xs={8}>
                  <span>{cuser.googleId ? cuser.googleId : 'Không có'}</span>
                </CCol>
              </li>
              <li className="row border-bottom py-3">
                <CCol xs={4}>
                  <h6 className="m-0">Apple Id </h6>
                </CCol>
                <CCol xs={8}>
                  <span>{cuser.appleId ? cuser.appleId : 'Không có'}</span>
                </CCol>
              </li>
              <li className="row border-bottom py-3">
                <CCol xs={4}>
                  <h6 className="m-0">Facebook Id </h6>
                </CCol>
                <CCol xs={8}>
                  <span>{cuser.facebookId ? cuser.facebookId : 'Không có'}</span>
                </CCol>
              </li>
              <li className="row border-bottom py-3">
                <CCol xs={4}>
                  <h6 className="m-0">Created at </h6>
                </CCol>
                <CCol xs={8}>
                  <span>{formatDate(new Date(cuser.createdAt))}</span>
                </CCol>
              </li>
              <li className="row border-bottom py-3">
                <CCol xs={4}>
                  <h6 className="m-0">Updated at </h6>
                </CCol>
                <CCol xs={8}>
                  <span>{formatDate(new Date(cuser.updatedAt))}</span>
                </CCol>
              </li>
            </ul>
          </CCard>
        </CCol>
      </div>
    </div>
  )
}

export default CUserDetails
