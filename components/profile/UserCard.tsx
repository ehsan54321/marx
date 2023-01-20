import * as Avatar from '@radix-ui/react-avatar'
import http from '@services/httpServices'
import Swal from 'sweetalert2'
import { AuthContext } from '@store/auth'
import { numberToPersian, resErr } from '@lib/helper'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const UserCard = () => {
  const { setAuthState, authState } = useContext(AuthContext)
  const router = useRouter()
  const { t } = useTranslation()
  const Logout = () => {
    http
      .get('api/v2/auth/logout')
      .then(() => {
        setAuthState(null)
        router.push('/auth#login')
        Swal.fire({
          icon: 'error',
          toast: true,
          position: 'top-end',
          timer: 7000,
          title: t('logout-text'),
          showConfirmButton: false,
          showCloseButton: true,
          timerProgressBar: true,
        })
      })
      .catch(() => resErr(t))
  }
  return (
    <div className="p-3 background-color bg-white min-w-0 bg-clip-border">
      <div className="text-center p-2">
        <Avatar.Root className="items-center justify-center align-middle select-none overflow-hidden inline-flex bg-slate-100 w-32 h-32 rounded-full an_fadeIn filter-invert-dark">
          <Avatar.Fallback className="leading-4 text-base font-medium text-purple-800 flex items-center justify-center bg-slate-100 w-full h-full">
            {authState.user.name.toLocaleUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
      <div className="divider flex mt-1 mb-2">
        <span className="px-4">{t('info.user')}</span>
      </div>
      <div className="text-center flex-auto p-4">
        <div className="mb-4">
          <p>
            <span className="text-slate-500 h6">{t('info.account')}</span>
            {authState.user.name}
          </p>
          <p>
            <span className="text-slate-500 h6">
              {t('info.create.account')}
            </span>
            {numberToPersian(authState.user.date, t('lang'))}
          </p>
          <p>
            <span className="text-slate-500 h6">{t('info.iat.account')}</span>
            {numberToPersian(authState.iat, t('lang'))}
          </p>
          <p>
            <span className="text-slate-500 h6">{t('info.exp.account')}</span>
            {numberToPersian(authState.expires, t('lang'))}
          </p>
        </div>
        <button
          type="button"
          className="inline-block mb-0 px-4 py-1.5 bg-white text-red-600 text-base rounded-md border border-solid border-red-600 hover:bg-red-600 hover:text-white hover:shadow-md outline-0 transition-btn cursor-pointer"
          onClick={Logout}
        >
          <span>{t('info.logout')}</span>
        </button>
      </div>
    </div>
  )
}

export default UserCard
