import SEO from '@components/Seo'
import { AuthContext } from '@store/auth'
import { Error401 } from '@components/error'
import { GetStaticProps } from 'next'
import { useContext } from 'react'
import { UserCard, UserInfo } from '@components/profile'
import { useTranslation } from 'react-i18next'

export const getStaticProps: GetStaticProps = () => {
  return { props: { NoFooter: true } }
}
const Account = () => {
  const { authState, isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  if (isAuth) {
    return (
      <>
        <SEO title={`${t('profile')} ${authState.username}`} />
        <div className="w-100 text-right p-2 pt-0 ms-0 row">
          <div className="col-lg-3 col-md-5">
            <UserCard />
          </div>
          <div className="col-lg-9 col-md-7">
            <UserInfo />
          </div>
        </div>
      </>
    )
  } else return <Error401 btn>{t('error.no.login')}</Error401>
}

export default Account
