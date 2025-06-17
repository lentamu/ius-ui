import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackHomeButton from '../component/BackHomeButton'
import { useAppSelector } from '../hook/useAppSelector'
import useTitle from '../hook/useTitle'

const UrlDetailPage = () => {
  useTitle('URL Details')

  const { id } = useParams<{ id: string }>()
  const [notFound, setNotFound] = useState(false)
  const url = useAppSelector((state) =>
    state.shortUrls.items.find((item) => item.id === id)
  )

  useEffect(() => {
    if (!url) {
      setNotFound(true)
    }
  }, [url])

  if (notFound) {
    return <div className="p-4 text-red-500 font-semibold">URL not found</div>
  }

  if (!url) {
    return <div className="p-4 text-gray-600">Loading...</div>
  }

  return <div className="max-w-3xl mx-auto p-4">
    <div className="mb-6">
      <BackHomeButton />
    </div>

    <h1 className="text-2xl font-bold mb-4">URL Details</h1>
    <div className="bg-white shadow rounded p-4 space-y-4">
      <div>
        <strong>Original URL:</strong>{' '}
        <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {url.originalUrl}
        </a>
      </div>
      <div>
        <strong>Slug:</strong> <span className="text-indigo-600">{url.slug}</span>
      </div>
      <div>
        <strong>Short URL:</strong>{' '}
        <a
          href={`${import.meta.env.VITE_API_URL}/r/${url.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {import.meta.env.VITE_API_URL}/r/{url.slug}
        </a>
      </div>
      <div>
        <strong>Created By:</strong> {url.user?.username}
      </div>
      <div>
        <strong>Created At:</strong> {dayjs(url.createdAt).format('YYYY-MM-DD HH:mm')}
      </div>
      <div>
        <strong>Updated At:</strong> {dayjs(url.updatedAt).format('YYYY-MM-DD HH:mm')}
      </div>
    </div>
  </div>
}

export default UrlDetailPage