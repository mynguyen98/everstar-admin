import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import './scss/style.scss'
import { CToaster } from '@coreui/react'
import { useSelector } from 'react-redux'
import ModalsContainer from './views/notifications/modals/ModalsContainer'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
// const Profile = React.lazy(() => import('./views/pages/profile/Profile'))
// class App extends Component {
// render() {
const App = () => {
  const { toast, modal } = useSelector((state) => state.ui)
  const { visible, modalContent, title, size } = modal
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          {/* <Route exact path="/profile" name="Profile Page" element={<Profile />} /> */}
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            path="*"
            name="Home"
            element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            }
          >
            {/* <Route index element={<DefaultLayout />} /> */}
          </Route>
        </Routes>
        <CToaster push={toast} placement="top-end" />
        <ModalsContainer visible={visible} modalContent={modalContent} title={title} size={size} />
      </Suspense>
    </HashRouter>
  )
}
// }
// }

export default App
