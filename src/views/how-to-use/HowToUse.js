import React from 'react'
import {
  CCard,
  CCardBody,
  CAccordion,
  CAccordionItem,
  CAccordionBody,
  CAccordionHeader,
} from '@coreui/react'
import { AppBreadcrumb } from 'src/components'
const HowToUse = () => {
  return (
    <div>
      <AppBreadcrumb />
      <div>
        <h5 className="mb-2">How to use each tab</h5>
      </div>
      <CCard>
        <CCardBody style={{ overflowY: 'visible' }}>
          <CAccordion>
            <CAccordionItem>
              <CAccordionHeader>
                <strong>Idols tab </strong>
              </CAccordionHeader>
              <CAccordionBody>
                <strong>Listing all KOLs from store</strong> Include Kols information in the store
                <br />
                <strong>Create KOL</strong> button responsible for creating a new KOL in the store.
                <br />
                In the create KOL form, we need to provide each information corresponding to each
                field, including:
                <ul>
                  <li>Name of the KOL</li>
                  <li>Contact information (email, phone number, etc.)</li>
                  <li>Area of expertise or focus</li>
                </ul>
                When creating a new KOL, we need to choose the KOL that we want to publish to the
                store. If the user has not yet been set as a KOL, we need to set the user as a KOL
                in the User tab (find the user and set them as a KOL).
                <br />
                We also need to choose the subscription that we want to assign to the KOL. If the
                subscription is not available, we need to create a new one.
                <br />
                Finally, we can hit the submit button to create the new KOL and publish their
                information to the store.
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem>
              <CAccordionHeader>
                <strong>Users tab </strong>
              </CAccordionHeader>
              <CAccordionBody>
                <strong>Listing all Users</strong> Include Users information.
                <br />
                <br />
                <strong>Search form</strong> for searching users based on the information in the
                form. The search form should provides fields such as:
                <ul>
                  <li>Name</li>
                  <li>Email address</li>
                  <li>The user that be banned</li>
                  <li>The title (Kol or normal user)</li>
                </ul>
                The search form can then return a list of users that match the search criteria.
                <br />
                <br />
                Additionally, Filter button that is responsible for filtering the columns that we
                want to see or hide. This can be helpful for organizing and viewing.
                <br />
                <br />
                In each user row, there is a button More responsible for ban user or set user to the
                KOL.
                <br />
                Click to the user name to see the user detail information in the other page.
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem>
              <CAccordionHeader>
                <strong>Subscriptions tab </strong>
              </CAccordionHeader>
              <CAccordionBody>
                <strong>Listing all subscriptions</strong> information.
                <br />
                <strong>Create a new one</strong>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem>
              <CAccordionHeader>
                <strong>Users admin tab (for cms admin only) </strong>
              </CAccordionHeader>
              <CAccordionBody>
                <strong>Listing all users admin</strong> information.
                <br />
                <strong>Create a new admin.</strong>
                <br />
                Edit each user admin password in button more.
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default HowToUse
