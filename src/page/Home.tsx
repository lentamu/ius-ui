import { Link } from 'react-router-dom'
import useTitle from '../hook/useTitle'

const cards = [
  { title: 'About', to: '/about' },
  { title: 'Short URLs', to: '/urls' },
  { title: 'Login', to: '/login' },
  { title: 'Register', to: '/register' }
]

const HomePage = () => {
  useTitle('Home')

  return <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Navigation</h1>
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.to}
          to={card.to}
          className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition"
        >
          <h2 className="text-lg font-semibold">{card.title}</h2>
          <p className="text-sm text-gray-500">{card.to}</p>
        </Link>
      ))}
    </div>
  </div>
}

export default HomePage