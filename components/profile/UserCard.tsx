import http from '@services/httpServices'
import sweetalert2 from 'sweetalert2'
import { AuthContext } from '@store/auth'
import { resErr, numberToPersian } from '@lib/helper'
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
        localStorage.removeItem('star')
        router.push('/auth#login')
        sweetalert2.fire({
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
    <div className="p-3 background-color card">
      <div className="text-center p-2">
        <img
          src={authState.poster_path}
          className="rounded-circle"
          style={{ width: 128 }}
          alt={`${t('profile')} ${authState.username}`}
        />
      </div>
      <div className="divider d-flex mt-1 mb-2">
        <span className="px-3">{t('info.user')}</span>
      </div>
      <div className="text-center card-body">
        <div className="mb-3">
          <p>
            <span className="text-good h6">{t('info.account')}</span>
            {authState.username}
          </p>
          <p>
            <span className="text-good h6">{t('info.create.account')}</span>
            {numberToPersian(authState.date, t('lang'))}
          </p>
        </div>
        <button
          type="button"
          className="mb-0 btn btn-outline-danger"
          onClick={Logout}
        >
          <span>خروج حساب کاربری</span>
        </button>
      </div>
    </div>
  )
}

export default UserCard
