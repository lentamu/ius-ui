import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import GuestOnlyRoute from '../component/GuestOnlyRoute'
import InnerPage from '../component/InnerPage'
import NotFoundPage from '../component/NotFoundPage'
import ProtectedRoute from '../component/ProtectedRoute'
import AboutPage from '../page/About'
import HomePage from '../page/Home'
import LoginPage from '../page/Login'
import RegisterPage from '../page/Register'
import UrlDetail from '../page/UrlDetail'
import UrlsPage from '../page/Urls'

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" Component={InnerPage}>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={AboutPage} />
          <Route path="/urls" Component={UrlsPage} />

          <Route
            path="/urls/:id"
            element={<ProtectedRoute>
              <UrlDetail />
            </ProtectedRoute>}
          />
        </Route>

        <Route
          path="/login"
          element={<GuestOnlyRoute>
            <LoginPage />
          </GuestOnlyRoute>}
        />

        <Route
          path="/register"
          element={<GuestOnlyRoute>
            <RegisterPage />
          </GuestOnlyRoute>}
        />

        <Route path="*" Component={NotFoundPage} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default Router