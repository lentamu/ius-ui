import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hook/useAppSelector'

const GuestOnlyRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token)
  return token ? <Navigate to="/" replace /> : <>{children}</>
}

export default GuestOnlyRoute