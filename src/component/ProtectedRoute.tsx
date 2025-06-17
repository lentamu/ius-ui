import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hook/useAppSelector'

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation()
  const token = useAppSelector((state) => state.auth.token)

  return token ? <>{children}</> : <Navigate to="/login" state={{ from: location }} replace />
}

export default ProtectedRoute