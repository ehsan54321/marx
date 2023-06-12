import Link from 'next/link'
import Loader from '@//components/Loader'
import Meta from '@/components/Meta'
import useTranslation from '@/hooks/translation'
import { AuthContext } from '@/store/auth'
import { Error401 } from '@/components/error'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useContext, useState } from 'react'
import { UserCard, UserInfo } from '@/components/profile'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

const Account = () => {
  const { authState, isAuth } = useContext(AuthContext)
  const [show, setShow] = useState<boolean>(true)
  const t = useTranslation()
  if (isAuth) {
    return (
      <>
        <Meta
          title={`${t('profile')} ${authState.user.name}`}
          description={`${t('profile')} ${authState.user.name}`}
          keywords={[t('profile')]}
        />
        <nav className="my-6">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className="hover:text-blue-500" locale={t('lang')} href="/">
                {t('home')}
              </Link>
            </li>
            <li className="breadcrumb-item">{t('profile')}</li>
            <li className="breadcrumb-item active">{authState.user.name}</li>
          </ul>
        </nav>
        <div className="w-full text-right pb-2 mr-0 row flex-auto">
          <div className="col-lg-4 px-0">
            <UserCard setShow={setShow} />
          </div>
          <div className="col-lg-8 pl-0">
            <UserInfo />
          </div>
        </div>
      </>
    )
  } else
    return (
      <>
        {show ? (
          <div className="mt-6">
            <Error401 btn>{t('error.no.login')}</Error401>
          </div>
        ) : (
          <Loader />
        )}
      </>
    )
}

export default Account
