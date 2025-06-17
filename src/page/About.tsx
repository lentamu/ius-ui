import { faFilePen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import BackHomeButton from '../component/BackHomeButton'
import { useAppDispatch } from '../hook/useAppDispatch'
import { useAppSelector } from '../hook/useAppSelector'
import useTitle from '../hook/useTitle'
import { fetchAbout, updateAbout } from '../store/slice/aboutSlice'

const AboutPage = () => {
  useTitle('About')

  const dispatch = useAppDispatch()

  const { about, loading, saving, error } = useAppSelector((state) => state.about)
  const role = useAppSelector((state) => state.auth.user?.role)

  const [description, setDescription] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    dispatch(fetchAbout())
  }, [dispatch])

  useEffect(() => {
    if (about) {
      setDescription(about.description)
    }
  }, [about])

  const handleSubmit = async () => {
    if (!about) return
    const result = await dispatch(updateAbout({ id: about.id, description }))
    if (updateAbout.fulfilled.match(result)) {
      setIsEditing(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return <>
    <div className="mb-6">
      <BackHomeButton />
    </div>

    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">About Url Shortener</h1>

      {isEditing ? <>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-48 p-2 border rounded mb-4"
            />
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </> : <div className="flex justify-between w-full space-x-3">
        <p className="whitespace-pre-wrap p-4 rounded bg-gray-50 w-full">
          {about?.description}
        </p>
        {role?.toLowerCase() === 'admin' && (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
            title="Edit this page"
          >
            <FontAwesomeIcon icon={faFilePen} />
          </button>
        )}
      </div>}
    </div>
  </>
}

export default AboutPage