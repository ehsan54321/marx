import SEO from '@components/Seo'
import { AuthContext } from '@store/auth'
import { Col } from 'react-bootstrap'
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
        <div className="w-100 text-right p-2 ms-0 row">
          <Col xl={3} lg={3} md={6} sm={12} xs={12}>
            <UserCard user_name={authState.username} />
          </Col>
          <Col xl={9} lg={9} md={6} sm={12} xs={12}>
            <UserInfo />
          </Col>
        </div>
      </>
    )
  } else return <Error401 btn>{t('error.no.login')}</Error401>
}

export default Account
