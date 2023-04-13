import Link from 'next/link'
import Meta from '@components/Meta'
import { AuthContext } from '@store/auth'
import { Error401 } from '@components/error'
import { useContext } from 'react'
import { UserCard, UserInfo } from '@components/profile'
import { useTranslation } from 'react-i18next'

const Account = () => {
  const { authState, isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  if (isAuth) {
    return (
      <>
        <Meta
          title={`${t('profile')} ${authState.user.name}`}
          description={`${t('profile')} ${authState.user.name}`}
          keywords={t('profile')}
          canonical="account"
        />
        <nav className="my-6">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className="hover:text-blue-500" href="/">
                {t('home')}
              </Link>
            </li>
            <li className="breadcrumb-item">{t('profile')}</li>
            <li className="breadcrumb-item active">{authState.user.name}</li>
          </ul>
        </nav>
        <div className="w-full text-right pb-2 mr-0 row flex-auto">
          <div className="col-lg-4 px-0">
            <UserCard />
          </div>
          <div className="col-lg-8 pl-0">
            <UserInfo />
          </div>
        </div>
      </>
    )
  } else return <Error401 btn>{t('error.no.login')}</Error401>
}

export default Account
