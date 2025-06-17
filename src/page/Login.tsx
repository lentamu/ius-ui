import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import OuterPage from '../component/OuterPage'
import { useAppDispatch } from '../hook/useAppDispatch'
import { useAppSelector } from '../hook/useAppSelector'
import useTitle from '../hook/useTitle'
import { loginUser } from '../store/slice/authSlice'

const LoginPage = () => {
  useTitle('Login')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loading = useAppSelector((state) => state.auth.loading)
  const error = useAppSelector((state) => state.auth.error)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const result = await dispatch(loginUser({ username, password }))

    if (loginUser.fulfilled.match(result)) {
      navigate('/')
    }
  }

  return <OuterPage>
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
      Welcome Back 👋
    </h2>

    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-600 text-white py-2 rounded-md font-semibold cursor-pointer hover:bg-gray-700 transition"
      >
        Login
      </button>
    </form>

    <div className="mt-4 text-sm text-center text-gray-500">
      Don&#39;t have an account?{' '}
      <button
        onClick={() => navigate('/register')}
        className="text-gray-700 font-medium hover:underline cursor-pointer"
      >
        Register
      </button>
    </div>
  </OuterPage>
}

export default LoginPage