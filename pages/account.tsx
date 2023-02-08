import { AuthContext } from '@store/auth'
import { baseURL } from '@baseUrl'
import { Error401 } from '@components/error'
import { NextSeo } from 'next-seo'
import { useContext } from 'react'
import { UserCard, UserInfo } from '@components/profile'
import { useTranslation } from 'react-i18next'

const Account = () => {
  const { authState, isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  if (isAuth) {
    return (
      <>
        <NextSeo
          title={`${t('profile')} ${authState.user.name}`}
          titleTemplate={`${t('profile')} ${authState.user.name}` + t('title')}
          description={`${t('profile')} ${authState.user.name}`}
          canonical={baseURL + 'account'}
          additionalMetaTags={[
            {
              name: 'apple-mobile-web-app-title',
              content: `${t('profile')} ${authState.user.name}` + t('title'),
            },
          ]}
          openGraph={{
            url: baseURL + 'account',
            title: `${t('profile')} ${authState.user.name}` + t('title'),
            description: `${t('profile')} ${authState.user.name}`,
          }}
        />
        <nav className="my-6">
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
