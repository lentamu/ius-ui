import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const BackHomeButton = () => {
  return <div className="mt-6">
    <Link
      to="/"
      className="inline-block bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded transition"
    >
      <span><FontAwesomeIcon icon={faArrowLeft} /> Back to Home</span>
    </Link>
  </div>
}

export default BackHomeButton