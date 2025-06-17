import { Outlet } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const InnerPage = () => {
  return <div className="container mx-auto mt-4">
    <div className="flex justify-end max-w-5xl px-4">
      <LogoutButton />
    </div>
    <div className="flex flex-wrap justify-center">
      <div className="w-full max-w-5xl px-4">
        <Outlet />
      </div>
    </div>
  </div>
}

export default InnerPage