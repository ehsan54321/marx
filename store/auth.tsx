import http from '@/services/httpServices'
import useTranslation from '@/hooks/translation'
import { createContext, useEffect, useState } from 'react'
import { resErr } from '@/lib/helper'

type context = {
  isAuth: boolean
  isFind: any
  setAuthState: any
  authState: any
}
export const AuthContext = createContext<context | null>(null)
const { Provider } = AuthContext

const AuthProvider = ({ children }): JSX.Element => {
  const t = useTranslation()
  const [authState, setAuthState] = useState(false)
  useEffect(() => {
    const getUser = () => {
      http
        .get('api/v3/auth/user')
        .then(({ data }) => {
          if (data === 'شما وارد نشدید') setAuthState(null)
          else {
            if (data !== 'شما وارد نشدید' && !localStorage.getItem('star')) {
              http.get(`/api/v3/star/user/${data.user.id}`).then((response) => {
                localStorage.setItem('star', JSON.stringify(response.data))
              })
            }
            setAuthState(data)
          }
        })
        .catch(() => {
          setAuthState(null)
          resErr(t)
        })
    }
    getUser()
  }, [])

  const isFind = () => {
    if (authState === false) return true
    else return false
  }
  const value = { isAuth: !!authState, authState, isFind, setAuthState }
  return <Provider value={value}>{children}</Provider>
}

export default AuthProvider
