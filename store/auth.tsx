import http from '@services/httpServices'
import { createContext, useEffect, useState } from 'react'
import { resErr } from '@lib/helper'
import { useTranslation } from 'react-i18next'

type authObj = {
  email: string
  username: string
  password: string
  poster_path: string
  is_admin: boolean
}
type context = {
  isAuth: boolean
  isFind: Function
  setAuthState: Function
  authState: any
}
export const AuthContext = createContext<context | null>(null)
const { Provider } = AuthContext

const AuthProvider = ({ children }): JSX.Element => {
  const { t } = useTranslation()
  const [authState, setAuthState] = useState<authObj | null | boolean>(false)
  useEffect(() => {
    const url = location.pathname.split('/')[1]
    if (url !== 'coins' && url !== '') {
      http
        .get('api/user')
        .then((res: { data: { status: string; data: authObj } }) => {
          if (res.data.status === 'SUCCESS') setAuthState(res.data.data)
          else setAuthState(null)
        })
        .catch(() => {
          setAuthState(null)
          resErr(t)
        })
    }
  }, [])

  const isFind = () => {
    if (authState === false) return true
    else return false
  }

  return (
    <Provider value={{ isAuth: !!authState, authState, isFind, setAuthState }}>
      {children}
    </Provider>
  )
}

export default AuthProvider
