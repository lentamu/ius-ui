import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import OuterPage from '../component/OuterPage'
import useTitle from '../hook/useTitle'
import { fetchApi } from '../lib/api'

type RegisterFormData = {
  username: string
  password: string
  confirmPassword: string
}

const RegisterPage = () => {
  useTitle('Register')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>()

  const navigate = useNavigate()

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetchApi('/register', {
        method: 'POST',
        body: {
          username: data.username,
          password: data.password
        }
      })

      const body = await response.json()
      if (response.ok) {
        navigate('/login')
      } else {
        toast.error(body.message)
      }
    } catch (e) {
      toast.error('Unable to connect to the server')
    }
  }

  return <OuterPage>
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
      Create Your Account 📝
    </h2>

    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
        <input
          {...register('username', { required: 'Username is required' })}
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.username ? 'border-red-500 ring-red-500' : 'border-gray-300 ring-blue-400'
          }`}
          placeholder="Choose a username"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Min length is 6' }
          })}
          type="password"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.password ? 'border-red-500 ring-red-500' : 'border-gray-300 ring-blue-400'
          }`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
        <input
          {...register('confirmPassword', {
            required: 'Confirm your password',
            validate: (value) => value === watch('password') || 'Passwords do not match'
          })}
          type="password"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.confirmPassword ? 'border-red-500 ring-red-500' : 'border-gray-300 ring-blue-400'
          }`}
          placeholder="Repeat password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-2 rounded-md font-semibold cursor-pointer hover:bg-gray-700 transition"
      >
        Register
      </button>
    </form>

    <div className="mt-4 text-sm text-center text-gray-500">
      Already have an account?{' '}
      <button
        onClick={() => navigate('/login')}
        className="text-gray-700 font-medium hover:underline cursor-pointer"
      >
        Login
      </button>
    </div>
  </OuterPage>
}

export default RegisterPage