import { jwtDecode } from 'jwt-decode'

interface Token {
  sub: string
  username: string
  role: string
  exp: number
}

export const parseJwt = (token: string): Token | null => {
  try {
    return jwtDecode(token)
  } catch (e) {
    return null
  }
}

export const isTokenExpired = (token: string): boolean => {
  const parsedToken = parseJwt(token)
  if (!parsedToken) return false

  const currentTime = Math.floor(Date.now() / 1000)
  return parsedToken.exp < currentTime
}