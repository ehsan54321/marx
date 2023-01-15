import * as Avatar from '@radix-ui/react-avatar'
import classNames from 'classnames'
import http from '@services/httpServices'
import Image from 'next/image'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { AuthContext } from '@store/auth'
import { BsFillCaretDownFill, BsFillPersonFill } from 'react-icons/bs'
import { FcFaq } from 'react-icons/fc'
import { HiLogout } from 'react-icons/hi'
import { resErr } from '@lib/helper'
import Router, { useRouter } from 'next/router'
import { ThemeContext } from '@store/theme'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const [modal, setModal] = useState<boolean>(false)
  const router = useRouter()
  const { t } = useTranslation()
  const activePathName = router.pathname.split('/')[1]
  Router.events.on('routeChangeStart', () => setModal(false))
  const marg = t('lang') ? 'ml-1' : 'mr-1'
  const height = () => {
    if (!modal) return 0
    if (activePathName && activePathName !== 'coins') return 182
    else return 240
  }
  const HomeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15px"
      height="15px"
      viewBox="0 0 30 30"
      className={classNames(marg, 'filter-invert-dark')}
    >
      <path
        fill="#dbf2ff"
        d="M2.5 28.5L2.5 11.279 14.998 3.587 27.5 11.279 27.5 28.5z"
      />
      <path
        fill="#7496c4"
        d="M14.998,4.174L27,11.559V28H3V11.559L14.998,4.174 M14.998,3L2,11v18h26V11L14.998,3L14.998,3z"
      />
      <path fill="#b5ddf5" d="M3 25H27V28H3z" />
      <path
        fill="#f78f8f"
        d="M14.998 4.644L1.5 12.951 1.5 9.895 14.998 1.587 28.5 9.895 28.5 12.952z"
      />
      <path
        fill="#c74343"
        d="M14.998,2.174l13.002,8v1.883L15.522,4.379l-0.524-0.322l-0.524,0.323L2,12.056v-1.882 L14.998,2.174 M14.998,1L1,9.615v4.231l13.998-8.615L29,13.846V9.615L14.998,1L14.998,1z"
      />
      <g>
        <path fill="#ffc49c" d="M11.5 16.5H18.5V28.5H11.5z" />
        <path fill="#a16a4a" d="M18,17v11h-6V17H18 M19,16h-8v13h8V16L19,16z" />
      </g>
      <path
        fill="#a16a4a"
        d="M16.5 22A0.5 0.5 0 1 0 16.5 23A0.5 0.5 0 1 0 16.5 22Z"
      />
    </svg>
  )
  const StarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 48 48"
      className={classNames(marg, 'filter-invert-dark')}
    >
      <path
        fill="#FFCA28"
        d="M24 4.051L30.49 17.186 45 19.29 34.5 29.512 36.977 43.949 24 37.137 11.023 43.949 13.5 29.512 3 19.29 17.51 17.186z"
      />
    </svg>
  )
  return (
    <nav
      className="bg-white sticky layout_head z-20 top-0 h-16"
      dir={t('lang') ? 'rtl' : 'ltr'}
    >
      <div className="container-xxl justify-between items-center flex h-full">
        <div className="flex">
          <div className="flex items-center justify-between">
            <ul className="contents">
              <li className="nav-item">
                <button
                  className={classNames(
                    'block sm:hidden bg-transparent',
                    t('lang') ? 'ml-2' : 'mr-2'
                  )}
                  onClick={() => setModal(!modal)}
                >
                  <div
                    className={classNames(
                      'block w-6 h-1 bg-black transition-all ease-in-out duration-500 my-1 rounded',
                      modal ? 'active' : ''
                    )}
                    id="one"
                  ></div>
                  <div
                    className={classNames(
                      'block w-6 h-1 bg-black my-1 rounded',
                      modal ? 'opacity-0' : ''
                    )}
                  ></div>
                  <div
                    className={classNames(
                      'block w-6 h-1 bg-black transition-all ease-in-out duration-500 my-1 rounded',
                      modal ? 'active' : ''
                    )}
                    id="three"
                  ></div>
                </button>
              </li>
              <li className="nav-item">
                <Link href="/" className="flex">
                  <Image
                    src="/static/images/favicon.ico"
                    alt="لوگو"
                    width={33}
                    height={33}
                  />
                  <span
                    className={classNames(
                      'font-bold text-[15px] mt-[6px] sm:hidden text-black',
                      t('lang') ? 'mr-2' : 'ml-2'
                    )}
                  >
                    MAR<span className="text-red-500">X</span>
                  </span>
                </Link>
              </li>
              <li
                className={classNames(
                  'nav-item max-sm:hidden h-6',
                  t('lang') ? 'layout_divider' : 'layout_dividerEn'
                )}
              >
                <div className="vr h-full lg:mx-2"></div>
              </li>
            </ul>
          </div>
          <div
            className={classNames(
              modal ? 'layout_active' : 'sm:h-[auto!important]',
              'layout_links items-center flex bg-white overflow-hidden'
            )}
            style={{ height: height() }}
          >
            <ul className="block sm:flex sm:m-auto mt-4 items-center">
              <Link
                href="/"
                className="font-medium px-4 py-2 sm:rounded-lg sm:hover:bg-slate-100 text-lg sm:inline block sm:leading-1 leading-10"
              >
                <HomeIcon />
                <span
                  className={
                    activePathName !== ''
                      ? 'text-slate-500'
                      : 'text-slate-700 transition'
                  }
                >
                  {t('home')}
                </span>
              </Link>
              <Link
                href="/stars"
                className="font-medium px-4 py-2 sm:rounded-lg sm:hover:bg-slate-100 text-lg sm:inline block sm:leading-1 leading-10"
              >
                <StarIcon />
                <span
                  className={
                    activePathName !== 'stars'
                      ? 'text-slate-500 transition'
                      : 'text-slate-700'
                  }
                >
                  {t('stars')}
                </span>
              </Link>
              {(activePathName === '' || activePathName === 'coins') && (
                <a
                  href="#common-questions"
                  className="font-medium px-4 py-2 rounded-lg sm:hover:bg-slate-100 text-lg sm:inline block sm:leading-1 leading-10"
                >
                  <FcFaq
                    className={classNames('filter-invert-dark mt-0', marg)}
                  />
                  <span className="text-slate-500">{t('faq')}</span>
                </a>
              )}

              {modal && (
                <div className="w-screen text-center">
                  <div className="flex justify-center pt-0">
                    <Auth />
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div className="hidden sm:flex items-center">
          <Auth />
        </div>
      </div>
    </nav>
  )
}

const Auth = () => {
  const { isFind, setAuthState, authState, isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  const router = useRouter()
  const Logout = () => {
    http
      .get('api/v2/auth/logout')
      .then(() => {
        setAuthState(null)
        router.push('/auth#login')
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
        <span className="loader">
          <svg viewBox="22 22 44 44">
            <circle
              cx="44"
              cy="44"
              r="20.2"
              fill="none"
              strokeWidth="3.6"
            ></circle>
          </svg>
        </span>
      ) : !isAuth ? (
        <Link href="/auth#login">
          <button
            type="button"
            className="inline-block px-3.5 py-1.5 bg-white text-black text-base rounded-md border border-solid border-black hover:bg-black hover:text-white hover:shadow-md outline-none transition-btn cursor-pointer ml-[3px]"
          >
            <span>{t('btn-login')}</span>
          </button>
        </Link>
      ) : (
        <div className="relative flex items-center">
          <div className="sm:hidden">
            <Link href="/account">
              <Avatar.Root className="items-center justify-center align-middle select-none overflow-hidden inline-flex bg-slate-100 mr-2 w-12 h-12 rounded-full">
                <Avatar.Fallback className="leading-4 text-[15px] font-medium text-purple-800 w-full h-full flex items-center justify-center bg-slate-100">
                  {authState.username.toLocaleUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
            </Link>
          </div>
          <div id="momMenu">
            <button
              className="pl-0 bg-white max-sm:hidden min-w-[67px] max-w-[67px] cursor-pointer"
              type="button"
            >
              <Avatar.Root
                className={classNames(
                  'items-center justify-center align-middle select-none overflow-hidden inline-flex bg-slate-100 w-12 h-12 rounded-full an_fadeIn',
                  t('lang') ? 'ml-1' : 'mr-1'
                )}
              >
                <Avatar.Fallback className="leading-4 text-[15px] font-medium text-purple-800 flex items-center justify-center w-full h-full bg-slate-100 filter-invert-dark">
                  {authState.username.toLocaleUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
              <BsFillCaretDownFill />
            </button>
            <ul
              className={classNames(
                'layout_menu p-2 rounded-lg absolute bg-white max-sm:right-96',
                t('lang') ? 'right-[-60px]' : 'left-[-60px]'
              )}
            >
              <Link href="/account">
                <li className="leading-7 hover:bg-slate-100 rounded-md p-2 text-black">
                  <BsFillPersonFill />
                  <span className={t('lang') ? 'mr-1' : 'ml-1'}>
                    {t('profile')}
                  </span>
                </li>
              </Link>
              <div onClick={Logout}>
                <li className="leading-7 hover:bg-red-100 text-red-500 rounded-md p-2 cursor-pointer filter-invert-dark">
                  <HiLogout />
                  <span className={t('lang') ? 'mr-2' : 'ml-2'}>
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
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useContext(ThemeContext)
  const ChangeLang = () => {
    if (t('lang')) {
      i18n.changeLanguage('en')
      localStorage.setItem('lang', 'en')
    } else {
      i18n.changeLanguage('fa')
      localStorage.setItem('lang', 'fa')
    }
  }
  return (
    <>
      <div
        className={classNames(t('lag') ? 'ml-2' : 'mr-2', 'flex items-center')}
      >
        <div
          className={t('lang') ? 'ml-2' : 'mr-2'}
          onClick={() => {
            if (theme) document.querySelector('body').classList.add('dark')
            else document.querySelector('body').classList.remove('dark')
            localStorage.setItem('theme', (!theme).toString())
            setTheme(!theme)
          }}
        >
          <div className="flex items-center">
            <label htmlFor="airplane-mode" className="mt-2">
              <span className="cursor-pointer mx-1 text-[22px] filter-invert-dark">
                {!theme ? '☀️' : '🌒'}
              </span>
            </label>
            <div
              className="SwitchRoot rounded-full relative"
              id="airplane-mode"
              data-state={theme ? '' : 'checked'}
            >
              <button
                className="SwitchThumb bg-white rounded-full block mr-1"
                data-state={theme ? '' : 'checked'}
              />
            </div>
          </div>
        </div>
        <span
          className="cursor-pointer filter-invert-dark"
          onClick={ChangeLang}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              fill="#CFD8DC"
              d="M15,13h25c1.104,0,2,0.896,2,2v25c0,1.104-0.896,2-2,2H26L15,13z"
            />
            <path
              fill="#546E7A"
              d="M26.832,34.854l-0.916-1.776l0.889-0.459c0.061-0.031,6.101-3.208,9.043-9.104l0.446-0.895l1.79,0.893l-0.447,0.895c-3.241,6.496-9.645,9.85-9.916,9.989L26.832,34.854z"
            />
            <path
              fill="#546E7A"
              d="M38.019 34l-.87-.49c-.207-.116-5.092-2.901-8.496-7.667l1.627-1.162c3.139 4.394 7.805 7.061 7.851 7.087L39 32.26 38.019 34zM26 22H40V24H26z"
            />
            <path fill="#546E7A" d="M32 20H34V24H32z" />
            <path
              fill="#2196F3"
              d="M33,35H8c-1.104,0-2-0.896-2-2V8c0-1.104,0.896-2,2-2h14L33,35z"
            />
            <path fill="#3F51B5" d="M26 42L23 35 33 35z" />
            <path
              fill="#fff"
              d="M19.172,24h-4.36l-1.008,3H11l4.764-13h2.444L23,27h-2.805L19.172,24z M15.444,22h3.101l-1.559-4.714L15.444,22z"
            />
          </svg>
        </span>
      </div>
    </>
  )
}

export default Header
