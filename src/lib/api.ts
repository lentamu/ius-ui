let accessToken = localStorage.getItem('token') || ''

interface ApiRequestInit extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>
}

function setHeader(options: ApiRequestInit, header: string, value: string): void {
  options.headers = { ...(options.headers || {}), [header]: value }
}

function isObject(x: unknown): boolean {
  return typeof x === 'object'
    && !Array.isArray(x)
    && x !== null
}

export const getToken = (): string => accessToken

export const setToken = (token?: string): void => {
  accessToken = token || ''
  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}

export const fetchApi = async (path: string, options: ApiRequestInit = {}): Promise<Response> => {
  if (accessToken) {
    setHeader(options, 'Authorization', 'Bearer ' + accessToken)
  }

  if (isObject(options.body) && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body)
    setHeader(options, 'Content-Type', 'application/json')
  }

  setHeader(options, 'Accept', 'application/json')

  const url = import.meta.env.VITE_API_URL + path
  return fetch(url, options)
}