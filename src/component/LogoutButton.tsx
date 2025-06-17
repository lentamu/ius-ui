import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hook/useAppDispatch'
import { useAppSelector } from '../hook/useAppSelector'
import { logout } from '../store/slice/authSlice'

const LogoutButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  if (!user) return <></>

  return <button
    onClick={handleLogout}
    className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
  >
    Logout
  </button>
}

export default LogoutButton