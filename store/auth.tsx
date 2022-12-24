import http from '@services/httpServices'
import { createContext, useEffect, useState } from 'react'
import { resErr } from '@lib/helper'
import { useTranslation } from 'react-i18next'

type authObj = {
  email: string
  username: string
  password: string
  poster_path: string
  date: string
  is_admin: boolean
}
type context = {
  isAuth: boolean
  isFind: any
  setAuthState: any
  authState: any
}
export const AuthContext = createContext<context | null>(null)
const { Provider } = AuthContext

const AuthProvider = ({ children }): JSX.Element => {
  const { t } = useTranslation()
  const [authState, setAuthState] = useState<authObj | null | boolean>(false)
  useEffect(() => {
    http
      .get('api/v2/user')
      .then(({ data }) => {
        if (data === 'شما وارد نشدید') setAuthState(null)
        else setAuthState(data)
      })
      .catch(() => {
        setAuthState(null)
        resErr(t)
      })
  }, [])

  const isFind = () => {
    if (authState === false) return true
    else return false
  }
  const value = { isAuth: !!authState, authState, isFind, setAuthState }
  return (
    <div className="d-flex flex-column vh-100 justify-content-between">
      <Provider value={value}>{children}</Provider>
    </div>
  )
}

export default AuthProvider
