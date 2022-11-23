import Err401 from '@components/error/401'
import Image from 'next/image'
import Link from 'next/link'
import LoginForm from '@components/auth/Login'
import RegisterForm from '@components/auth/Register'
import SEO from '@components/Seo'
import { AuthContext } from '@store/auth'
import { Button, Tab, Tabs } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = () => {
  return { props: { NoLayout: true } }
}

const AuthPage = () => {
  const [status, setStatus] = useState<string>('login')
  const [img, setImg] = useState<boolean>(true)
  const { isAuth } = useContext(AuthContext)
  const router = useRouter()
  const { t, i18n } = useTranslation()
  useEffect(() => {
    if (router.asPath.split('#')[1] === 'register') setStatus('register')
  }, [])
  useEffect(() => {
    location.replace('#' + status)
  }, [status])
  const ChangeLang = () => {
    if (t('lang')) {
      i18n.changeLanguage('en')
      localStorage.setItem('lang', 'en')
    } else {
      i18n.changeLanguage('fa')
      localStorage.setItem('lang', 'fa')
    }
  }
  const text: string = t('lang')
    ? `صفحه ${status === 'register' ? 'ثبت نام' : 'ورود'}`
    : `Page ${status === 'register' ? 'Register' : 'Login'}`
  return (
    <>
      {!isAuth ? (
        <>
          <SEO title={text} />
          <div className="mt-3 ms-2">
            <Link href="/">
              <Button variant="outline-secondary">
                {t('go.to.home.page')}
              </Button>
            </Link>
          </div>
          <div>
            <div className="text-center" style={{ marginBottom: -160 }}>
              <Image
                src="/static/images/favicon.ico"
                alt="لوگو"
                className={img ? '' : 'opacity-0'}
                width={120}
                height={120}
              />
            </div>
            <div className="background-color text-center m-auto ps-3 pe-3 auth_login">
              <Tabs
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
                <Tab eventKey="settings" title={t('settings')}>
                  <div className="d-flex">
                    <select
                      className="form-select form-select-sm mb-3 me-3"
                      onChange={ChangeLang}
                      value={t('lang') ? 'fa' : 'en'}
                    >
                      <option value="fa">فارسی</option>
                      <option value="en">English</option>
                    </select>
                    <select
                      className="form-select form-select-sm mb-3 ms-3"
                      onChange={(e) => setImg(e.target.value === 'img')}
                      value={img ? 'img' : 'no_img'}
                    >
                      <option value="img">{t('img')}</option>
                      <option value="no_img">{t('no.img')}</option>
                    </select>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-4">
          <Err401>{t('error.401')}</Err401>
        </div>
      )}
    </>
  )
}

export default AuthPage
