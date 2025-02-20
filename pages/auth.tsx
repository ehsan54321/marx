import Link from 'next/link'
import Loader from '@//components/Loader'
import Meta from '@/components/Meta'
import useTranslation from '@/hooks/translation'
import { AuthContext } from '@/store/auth'
import { Error401 } from '@/components/error'
import { FaGithub } from 'react-icons/fa'
import { LoginForm, RegisterForm, SettingsFrom } from '@/components/auth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useContext, useEffect, useState } from 'react'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
const AuthPage = () => {
  const [status, setStatus] = useState<string>('login')
  const [img, setImg] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(true)
  const [theme, setTheme] = useState<boolean>(true)
  const { isAuth } = useContext(AuthContext)
  const t = useTranslation()
  useEffect(() => {
    if (location.hash === '#register') setStatus('register')
    else if (location.hash === '#settings') setStatus('settings')
  }, [])
  const text: string =
    t('dir') === 'rtl' ? 'صفحه ورود و ثبت نام' : 'Page Login & Register'
  return !isAuth ? (
    <>
      <Meta
        title={text}
        description={text}
        keywords={['صفحه ثبت نام', 'صفحه ورود']}
      />
      <div className={show ? '' : 'hidden'}>
        <div className="mt-4 mr-2">
          <Link href="/" locale={t('lang')}>
            <button
              type="button"
              className="inline-block px-6 py-2 bg-gray-200 text-gray-800 text-base rounded-md hover:bg-gray-300 transition-btn cursor-pointer"
            >
              {t('go.to.home.page')}
            </button>
          </Link>
        </div>
        <div>
          <div className="text-center -mb-40">
            <img
              src="/favicon-192x192.png"
              alt="لوگو"
              className={img ? '' : 'opacity-0'}
              width={110}
            />
          </div>
          <div className="background-color bg-white text-center mx-auto pr-4 pe-3 pt-16 mt-[15vh] sm:w-[550px]">
            <div className="mb-4">
              <ul className={theme ? 'nav nav-tabs' : 'nav nav-pills'}>
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
              <div className="slid opacity-[1!important]">
                <LoginForm setShow={() => setShow(false)} />
                {/* <LoginEasy /> */}
              </div>
            )}
            {status === 'register' && (
              <div className="slid opacity-[1!important]">
                <RegisterForm setShow={() => setShow(false)} />
              </div>
            )}
            {status === 'settings' && (
              <div className="slid opacity-[1!important]">
                <SettingsFrom
                  setImg={setImg}
                  img={img}
                  theme={theme}
                  setTheme={setTheme}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      {show ? (
        <div className="mt-6">
          <Error401 btnHome>{t('error.401')}</Error401>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

// const LoginEasy = () => {
//   return (
//     <div className="mt-4">
//       <button className="inline-block py-1.5 text-base border border-solid bg-black text-white cursor-pointer rounded-md shadow-md hover:bg-[#424649] border-[#212529] outline-0 transition-btn w-full filter-invert-dark">
//         <FaGithub className="ml-1 mt-[3.5px]" size={20} />
//         ورود از طریق گیت هاب
//       </button>
//       {/* <button className="btn btn-danger mt-1 w-full">
//         <FaGoogle className="ml-1 mt-[3.5px]" size={20} />
//         ورود از طریق گوگل
//       </button> */}
//     </div>
//   )
// }

export default AuthPage
