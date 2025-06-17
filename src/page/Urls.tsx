import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackHomeButton from '../component/BackHomeButton'
import { useAppDispatch } from '../hook/useAppDispatch'
import { useAppSelector } from '../hook/useAppSelector'
import useTitle from '../hook/useTitle'
import { createShortUrl, deleteShortUrl, fetchShortUrls } from '../store/slice/shortUrlsSlice'

const CreateShortUrl = () => {
  useTitle('URLs')

  const [url, setUrl] = useState('')
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuthenticated)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!isAuth) {
      toast.error('You must be logged in to create a short URL')
      return
    }

    if (!url.trim()) {
      toast.error('Please enter a URL')
      return
    }

    dispatch(createShortUrl({ originalUrl: url }))
    setUrl('')
  }

  return <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
    <input
      type="url"
      placeholder="Enter original URL"
      className="flex-1 px-4 py-2 border rounded"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      required
    />
    <button
      type="submit"
      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded cursor-pointer"
    >
      Shorten
    </button>
  </form>
}

const UrlsPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, loading, error } = useAppSelector((state) => state.shortUrls)
  const isAuth = useAppSelector(state => state.auth.isAuthenticated)

  useEffect(() => {
    dispatch(fetchShortUrls())
  }, [dispatch])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  const onDelete = (id: string) => {
    if (!isAuth) {
      toast.error('You must be logged in to delete URLs')
      return
    }

    if (window.confirm('Are you sure you want to delete this URL?')) {
      dispatch(deleteShortUrl(id))
    }
  }

  return <div className="max-w-6xl mx-auto p-4">
    <div className="mb-6">
      <BackHomeButton />
    </div>

    <h2 className="text-2xl font-bold mb-6">Your Shortened URLs 🔗</h2>

    {isAuth && <CreateShortUrl />}

    {loading && <p className="text-gray-500">Loading...</p>}

    {!loading && <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Original URL</th>
            <th className="py-3 px-4">Slug</th>
            <th className="py-3 px-4">Created At</th>
            <th className="py-3 px-4">Updated At</th>
            {isAuth && <th className="py-3 px-4">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((url, index) => (
            <tr key={url.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4 break-all text-blue-600 underline">
                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                  {url.originalUrl}
                </a>
              </td>
              <td className="py-3 px-4 text-indigo-600">
                <a
                  href={`${import.meta.env.VITE_API_URL}/r/${url.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.slug}
                </a>
              </td>
              <td className="py-3 px-4">{dayjs(url.createdAt).format('YYYY-MM-DD HH:mm')}</td>
              <td className="py-3 px-4">{dayjs(url.updatedAt).format('YYYY-MM-DD HH:mm')}</td>
              {isAuth && <td className="py-3 px-4 space-x-3">
                <button
                  onClick={() => navigate('/urls/' + url.id)}
                  className="text-gray-600 hover:text-gray-800 font-semibold cursor-pointer"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>

                <button
                  onClick={() => onDelete(url.id)}
                  className="text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>}
  </div>
}

export default UrlsPage