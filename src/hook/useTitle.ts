import { useEffect } from 'react'

const useTitle = (title: string) => {
  useEffect(() => {
    const oldTitle = document.title
    title && (document.title = title.trim() + ' - IUS')
    return () => {
      document.title = oldTitle
    }
  }, [title])
}

export default useTitle