import Image from 'next/image'
import Link from 'next/link'
import SEO from '@components/Seo'
import { AuthContext } from '@store/auth'
import { Error401 } from '@components/error'
import { FaGithub } from 'react-icons/fa'
import { LoginForm, RegisterForm, SettingsFrom } from '@components/auth'
import { Slide } from 'react-reveal'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = () => {
  return { props: { NoLayout: true } }
}

const AuthPage = () => {
  const [status, setStatus] = useState<string>('login')
  const [img, setImg] = useState<boolean>(true)
  const [tem, setTem] = useState<boolean>(true)
  const { isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  useEffect(() => {
    if (location.hash === '#register') setStatus('register')
    else if (location.hash === '#settings') setStatus('settings')
  }, [])
  const text: string = t('lang')
    ? 'صفحه ورود و ثبت نام'
    : 'Page Login & Register'
  return !isAuth ? (
    <>
      <SEO title={text} url="auth" />
      <div className="mt-4 mr-2">
        <Link href="/">
          <button className="btn btn-outline-secondary">
            {t('go.to.home.page')}
          </button>
        </Link>
      </div>
      <div>
        <div className="text-center mb-[-160px]">
          <Image
            src="/static/images/favicon.ico"
            alt="لوگو"
            className={img ? '' : 'opacity-0'}
            width={110}
            height={110}
            priority
          />
        </div>
        <div className="background-color bg-white text-center mx-auto pr-4 pe-3 pt-16 mt-[15vh] sm:w-[550px]">
          <div className="mb-4">
            <ul className={tem ? 'nav nav-tabs' : 'nav nav-pills'}>
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
          {status === 'login' && (
            <Slide right>
              <LoginForm />
              <div className="mt-4">
                <button className="btn btn-dark w-full">
                  <FaGithub className="ml-1 mt-[3.5px]" size={20} />
                  ورود از طریق گیت هاب
                </button>
                {/* <button className="btn btn-danger mt-1 w-full">
                <FaGoogle className="ml-1 mt-[3.5px]" size={20} />
                ورود از طریق گوگل
              </button> */}
              </div>
            </Slide>
          )}
          {status === 'register' && (
            <Slide right>
              <RegisterForm />
              <div className="mt-4">
                <button className="btn btn-dark w-full">
                  <FaGithub className="ml-1 mt-[3.5px]" size={20} />
                  ورود از طریق گیت هاب
                </button>
                {/* <button className="btn btn-danger mt-1 w-full">
                <FaGoogle className="ml-1 mt-[3.5px]" size={20} />
                ورود از طریق گوگل
              </button> */}
              </div>
            </Slide>
          )}
          {status === 'settings' && (
            <Slide right>
              <SettingsFrom
                setImg={setImg}
                img={img}
                tem={tem}
                setTem={setTem}
              />
            </Slide>
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="mt-6">
      <Error401 btnHome>{t('error.401')}</Error401>
    </div>
  )
}

export default AuthPage
