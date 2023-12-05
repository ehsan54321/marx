import * as Avatar from '@radix-ui/react-avatar'
import classNames from 'classnames'
import http from '@/services/httpServices'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import useTranslation from '@/hooks/translation'
import { AuthContext } from '@/store/auth'
import { BsFillCaretDownFill, BsFillPersonFill } from 'react-icons/bs'
import { HiLogout } from 'react-icons/hi'
import { resErr } from '@/lib/helper'
import { RiMoonFill, RiSunLine } from 'react-icons/ri'
import { useContext } from 'react'
import { useTheme } from 'next-themes'

const Auth = ({ setShow }) => {
  const { isFind, setAuthState, authState, isAuth } = useContext(AuthContext)
  const t = useTranslation()
  const router = useRouter()
  const Logout = () => {
    http
      .get('api/v3/auth/logout')
      .then(() => {
        localStorage.removeItem('star')
        setAuthState(null)
        setShow(false)
        router
          .push('/auth#login', '/auth#login', { locale: t('lang') })
          .then(() => setShow(true))
        Swal.fire({
          icon: 'error',
          toast: true,
          position: 'top-end',
          timer: 7000,
          title: t('logout-text'),
          showConfirmButton: false,
          showCloseButton: true,
          timerProgressBar: true,
        })
      })
      .catch(() => resErr(t))
  }
  return (
    <>
      <ChangeMode />
      {isFind() ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="24"
          height="24"
          className="min-w-[60px] cursor-progress"
          fill="#aaa"
        >
          <path
            d="M8 0c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1.333C4.324 1.333 1.333 4.324 1.333 8c0 1.958.854 3.716 2.203 4.937.443-1.316 1.665-2.27 3.13-2.27h2.667c1.466 0 2.69.954 3.132 2.269 1.348-1.22 2.202-2.979 2.202-4.936 0-3.676-2.991-6.667-6.667-6.667zM8 4c1.104 0 2 .995 2 2.222v.556C10 8.005 9.104 9 8 9s-2-.995-2-2.222v-.556C6 4.995 6.896 4 8 4z"
            transform="translate(-716 -1131) translate(716 1131)"
          ></path>
        </svg>
      ) : !isAuth ? (
        <Link href="/auth#login" locale={t('lang')} prefetch={false}>
          <button
            type="button"
            className="head_login inline-block px-3.5 py-1.5 bg-white text-black text-base rounded-md border border-solid border-black hover:bg-black hover:text-white hover:shadow-md outline-0 transition-all cursor-pointer"
          >
            <span>{t('btn-login')}</span>
          </button>
        </Link>
      ) : (
        <div className="relative flex items-center">
          <div className="md:hidden">
            <Link href="/account" locale={t('lang')} prefetch={false}>
              <Avatar.Root className="items-center justify-center align-middle select-none overflow-hidden inline-flex bg-slate-100 mr-2 w-12 h-12 rounded-full">
                <Avatar.Fallback className="leading-4 text-[15px] font-medium text-purple-800 w-full h-full flex items-center justify-center bg-slate-100">
                  {authState.user.name.toLocaleUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
            </Link>
          </div>
          <div id="momMenu">
            <button
              className="pl-0 bg-white max-md:hidden min-w-[67px] max-w-[67px] cursor-pointer"
              type="button"
            >
              <Avatar.Root
                className={classNames(
                  'items-center justify-center align-middle select-none overflow-hidden inline-flex bg-slate-100 w-11 h-11 rounded-full',
                  t('dir') === 'rtl' ? 'ml-1' : 'mr-1'
                )}
              >
                <Avatar.Fallback className="leading-4 text-[15px] font-medium text-purple-800 flex items-center justify-center w-full h-full bg-slate-100 filter-invert-dark">
                  {authState.user.name.toLocaleUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
              <BsFillCaretDownFill />
            </button>
            <ul
              className={classNames(
                'menu p-2 rounded-lg absolute bg-white max-md:hidden',
                t('dir') === 'rtl' ? 'right-[-60px]' : 'left-[-60px]'
              )}
            >
              <Link href="/account" locale={t('lang')} prefetch={false}>
                <li className="leading-7 hover:bg-slate-100 rounded-md p-2 text-black">
                  <BsFillPersonFill />
                  <span className={t('dir') === 'rtl' ? 'mr-1' : 'ml-1'}>
                    {t('profile')}
                  </span>
                </li>
              </Link>
              <div onClick={Logout}>
                <li className="leading-7 hover:bg-red-100 text-red-500 rounded-md p-2 cursor-pointer filter-invert-dark">
                  <HiLogout />
                  <span className={t('dir') === 'rtl' ? 'mr-2' : 'ml-2'}>
                    {t('logout')}
                  </span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

const ChangeMode = () => {
  const t = useTranslation()
  const router = useRouter()
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const { pathname, asPath, query } = router
  const ChangeLang = () => {
    router.push({ pathname, query }, asPath, {
      locale: t('dir') === 'rtl' ? 'en' : 'fa',
    })
  }
  return (
    <>
      <div className="flex items-center mode mx-1">
        {currentTheme === 'dark' ? (
          <button
            onClick={() => setTheme('light')}
            className="bg-slate-100 p-2 rounded-xl cursor-pointer"
          >
            <RiSunLine size={25} color="black" />
          </button>
        ) : (
          <button
            onClick={() => setTheme('dark')}
            className="bg-slate-100 p-2 rounded-xl cursor-pointer"
          >
            <RiMoonFill size={25} />
          </button>
        )}

        <div>
          <img
            src={'/static/assets/img/flags/' + t('lang') + '.svg'}
            onClick={ChangeLang}
            className={classNames(
              'cursor-pointer filter-invert-dark w-6',
              t('dir') === 'rtl' ? 'mr-1' : 'ml-1'
            )}
            title={t('changeLang')}
            alt={t('lang')}
          />
        </div>
      </div>
    </>
  )
}

export default Auth
