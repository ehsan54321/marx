import Image from 'next/image'
import Link from 'next/link'
import SEO from '@components/Seo'
import { AuthContext } from '@store/auth'
import { Error401 } from '@components/error'
import { LoginForm, RegisterForm, SettingsFrom } from '@components/auth'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = () => {
  return { props: { NoLayout: true } }
}

const AuthPage = () => {
  const [status, setStatus] = useState<string>('login')
  const [img, setImg] = useState<boolean>(true)
  const { isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  useEffect(() => {
    if (location.href.split('#')[1] === 'register') setStatus('register')
  }, [])
  const text: string = t('lang')
    ? `صفحه ${status === 'register' ? 'ثبت نام' : 'ورود'}`
    : `Page ${status === 'register' ? 'Register' : 'Login'}`
  return !isAuth ? (
    <>
      <SEO title={text} />
      <div className="mt-3 ms-2">
        <Link href="/">
          <button className="btn btn-outline-secondary">
            {t('go.to.home.page')}
          </button>
        </Link>
      </div>
      <div>
        <div className="text-center" style={{ marginBottom: -160 }}>
          <Image
            src="/static/images/favicon.ico"
            alt="لوگو"
            className={img ? '' : 'opacity-0'}
            width={110}
            height={110}
          />
        </div>
        <div className="background-color bg-white text-center m-auto ps-3 pe-3 auth_login">
          <div className="mb-3">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={
                    status === 'login' ? 'nav-link active' : 'nav-link'
                  }
                  href="#login"
                  onClick={() => setStatus('login')}
                >
                  {t('login')}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    status === 'register' ? 'nav-link active' : 'nav-link'
                  }
                  href="#register"
                  onClick={() => setStatus('register')}
                >
                  {t('register')}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    status === 'settings' ? 'nav-link active' : 'nav-link'
                  }
                  href="#settings"
                  onClick={() => setStatus('settings')}
                >
                  {t('settings')}
                </a>
              </li>
            </ul>
          </div>
          {status === 'login' && <LoginForm />}
          {status === 'register' && <RegisterForm />}
          {status === 'settings' && <SettingsFrom setImg={setImg} img={img} />}
          {/* <Tabs
            activeKey={status}
            onSelect={(item) => setStatus(item)}
            className="mb-3"
          >
            <Tab eventKey="login" title={t('login')}>
              <LoginForm />
            </Tab>
            <Tab eventKey="register" title={t('register')}>
              <RegisterForm />
            </Tab>
            <Tab
              eventKey="settings"
              title={t('settings')}
              style={{ height: 200 }}
            >
              <SettingsFrom setImg={setImg} img={img} />
            </Tab>
          </Tabs> */}
        </div>
      </div>
    </>
  ) : (
    <div className="mt-4">
      <Error401>{t('error.401')}</Error401>
    </div>
  )
}

export default AuthPage
