import SEO from '@components/Seo'
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
        <SEO
          title={`${t('profile')} ${authState.user.name}`}
          url={'account/' + authState.user.name}
        />
        <nav className="mt-6 mb-6">
          <ul className="breadcrumb">
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
