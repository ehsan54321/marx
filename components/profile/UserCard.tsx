import http from '@services/httpServices'
import toast from 'sweetalert2'
import { AuthContext } from '@store/auth'
import { Button, Card } from 'react-bootstrap'
import { resErr, toPersian } from '@lib/helper'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const UserCard = ({ user_name }) => {
  const { setAuthState, authState } = useContext(AuthContext)
  const router = useRouter()
  const { t } = useTranslation()
  const Logout = () => {
    http
      .get('api/auth/logout')
      .then(() => {
        setAuthState(null)
        localStorage.removeItem('star')
        router.push('/auth#login')
        toast.fire({
          icon: 'error',
          toast: true,
          position: 'bottom-end',
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
    <div>
      <Card className="p-3">
        <div className="text-center p-2">
          <img
            src={authState.poster_path}
            className="rounded-circle"
            style={{ width: 128 }}
            alt={`${t('profile')} ${authState.username}`}
          />
        </div>
        <div className="divider divider-horizontal mt-1 mb-2" role="separator">
          <span className="px-3">{t('info.user')}</span>
        </div>
        <Card.Body className="text-center">
          <div className="mb-3">
            <p>
              <span className="text-good h6">{t('info.account')}</span>
              {user_name}
            </p>
            <p>
              <span className="text-good h6">{t('info.create.account')}</span>
              {toPersian('1401/8/29', t('lang'))}
            </p>
          </div>
          <Button className="mb-0" variant="outline-danger" onClick={Logout}>
            <p className="mb-0">خروج حساب کاربری</p>
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default UserCard
