import { FC, ReactNode } from 'react'

const OuterPage: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
      {children}
    </div>
  </div>
}

export default OuterPage