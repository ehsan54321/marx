import * as Avatar from '@radix-ui/react-avatar'
import classNames from 'classnames'
import http from '@services/httpServices'
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
    if (activePathName !== 'coins') return 222
    else return 268
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
      className="bg-white sticky layout_head z-30 top-0 h-14"
      dir={t('lang') ? 'rtl' : 'ltr'}
    >
      <div className="container-xxl justify-between items-center flex h-full">
        <div className="flex">
          <div className="flex items-center justify-between">
            <ul className="contents">
              <li className="nav-item">
                <button
                  className={classNames(
                    'block md:hidden bg-transparent',
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
                  <img
                    src="/favicon-96x96.png"
                    alt="لوگو"
                    className="w-[34px] h-[34px]"
                  />
                  <span
                    className={classNames(
                      'font-bold text-[15px] mt-[6px] md:hidden text-black',
                      t('lang') ? 'mr-2' : 'ml-2'
                    )}
                  >
                    MAR<span className="text-red-500">X</span>
                  </span>
                </Link>
              </li>
              <li
                className={classNames(
                  'nav-item max-md:hidden h-6',
                  t('lang') ? 'layout_divider' : 'layout_dividerEn'
                )}
              >
                <div className="vr h-full lg:mx-2"></div>
              </li>
            </ul>
          </div>
          <div
            className={classNames(
              modal ? 'layout_active' : 'md:h-[auto!important]',
              'layout_links items-center flex bg-white overflow-hidden'
            )}
            style={{ height: height() }}
          >
            <ul className="block md:flex md:m-auto mt-4 items-center">
              <Link
                href="/"
                className="font-medium px-4 py-1 rounded-lg md:hover:bg-slate-100 text-lg md:inline block md:leading-1 leading-10"
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
                href="/coins"
                className="font-medium px-4 py-1 rounded-lg md:hover:bg-slate-100 text-lg md:inline block md:leading-1 leading-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 48 48"
                  className={classNames(marg, 'filter-invert-dark')}
                >
                  <circle cx="20.5" cy="35.5" r="9.5" fill="#c9d4e0" />
                  <circle cx="20.5" cy="35.5" r="7.5" fill="#b2bbc7" />
                  <path
                    fill="#c9d4e0"
                    d="M18.116,39.329V37.9c0.519,0.318,1.071,0.476,1.657,0.476c0.441,0,0.786-0.105,1.035-0.315 c0.249-0.21,0.373-0.495,0.373-0.855c0-0.752-0.531-1.127-1.593-1.127c-0.346,0-0.764,0.032-1.254,0.095v-4.24h4.202V33.3h-2.773 v1.519c0.222-0.021,0.432-0.032,0.63-0.032c0.78,0,1.39,0.205,1.831,0.614c0.441,0.41,0.662,0.96,0.662,1.652 c0,0.765-0.263,1.391-0.789,1.876c-0.526,0.486-1.238,0.728-2.138,0.728C19.227,39.657,18.613,39.547,18.116,39.329z"
                  />
                  <path
                    d="M11.046,34.591c2.182,1.255,4.643,2.081,7.278,2.324c2.401,2.568,5.638,4.33,9.275,4.883	C29.088,40.121,30,37.919,30,35.5c0-5.247-4.253-9.5-9.5-9.5C15.56,26,11.504,29.771,11.046,34.591z"
                    opacity=".05"
                  />
                  <path
                    d="M11.266,33.552c2.226,1.342,4.779,2.199,7.52,2.387c2.374,2.69,5.708,4.501,9.462,4.929	C29.343,39.367,30,37.512,30,35.5c0-5.247-4.253-9.5-9.5-9.5C15.929,26,12.122,29.251,11.266,33.552z"
                    opacity=".07"
                  />
                  <circle cx="30" cy="26" r="14" fill="#ff8f6b" />
                  <circle cx="30" cy="26" r="12" fill="#ed6c47" />
                  <path
                    fill="#f5be00"
                    d="M29.039,31.308h-5.89v-1.623h1.929v-5.799l-1.981,0.429v-1.662l4.026-0.812v7.844h1.916V31.308z"
                  />
                  <path
                    fill="#ff8f6b"
                    d="M33.474,31.47c-2.217,0-3.325-1.556-3.325-4.669c0-1.615,0.3-2.845,0.899-3.692 c0.6-0.846,1.469-1.27,2.607-1.27c2.165,0,3.247,1.582,3.247,4.747c0,1.576-0.295,2.784-0.886,3.624 C35.426,31.05,34.578,31.47,33.474,31.47z M33.565,23.405c-0.887,0-1.331,1.115-1.331,3.344c0,2.1,0.435,3.149,1.305,3.149 c0.849,0,1.273-1.082,1.273-3.247S34.396,23.405,33.565,23.405z"
                  />
                  <radialGradient
                    id="gFcLP_8vJw7uqN0sJV2bNa"
                    cx="19.893"
                    cy="18.826"
                    r="18.001"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" />
                    <stop offset="1" stopOpacity="0" />
                  </radialGradient>
                  <path
                    fill="url(#gFcLP_8vJw7uqN0sJV2bNa)"
                    d="M16,26c0,4.429,2.062,8.37,5.272,10.936C30.617,36.281,38,28.512,38,19	c0-1.712-0.254-3.361-0.701-4.93C35.172,12.766,32.678,12,30,12C22.268,12,16,18.268,16,26z"
                  />
                  <linearGradient
                    id="gFcLP_8vJw7uqN0sJV2bNb"
                    x1="9.018"
                    x2="31.29"
                    y1="8.018"
                    y2="30.29"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#fede00" />
                    <stop offset="1" stopColor="#ffd000" />
                  </linearGradient>
                  <circle
                    cx="20"
                    cy="19"
                    r="16"
                    fill="url(#gFcLP_8vJw7uqN0sJV2bNb)"
                  />
                  <circle cx="20" cy="19" r="13" fill="#f5be00" />
                  <g>
                    <path
                      fill="#fee119"
                      d="M16.427,24.896v-2.385c0.866,0.53,1.788,0.795,2.765,0.795c0.736,0,1.312-0.175,1.727-0.525 c0.415-0.351,0.623-0.826,0.623-1.427c0-1.255-0.886-1.882-2.659-1.882c-0.578,0-1.275,0.053-2.094,0.159v-7.076h7.014v2.279 h-4.629v2.535c0.371-0.035,0.721-0.053,1.051-0.053c1.301,0,2.32,0.342,3.056,1.024c0.736,0.684,1.104,1.603,1.104,2.757 c0,1.277-0.439,2.321-1.316,3.131c-0.877,0.811-2.067,1.215-3.569,1.215C18.282,25.444,17.258,25.262,16.427,24.896z"
                    />
                  </g>
                </svg>
                <span
                  className={
                    activePathName !== 'coins'
                      ? 'text-slate-500'
                      : 'text-slate-700 transition'
                  }
                >
                  {t('coins')}
                </span>
              </Link>
              <Link
                href="/stars"
                className="font-medium px-4 py-1 rounded-lg md:hover:bg-slate-100 text-lg md:inline block md:leading-1 leading-10"
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
              {activePathName === 'coins' && (
                <a
                  href="#FAQ"
                  className="font-medium px-4 py-1 rounded-lg md:hover:bg-slate-100 text-lg md:inline block md:leading-1 leading-10"
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
        <div className="hidden md:flex items-center">
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
        <Link href="/auth#login">
          <button
            type="button"
            className="inline-block px-3.5 py-1.5 bg-white text-black text-base rounded-md border border-solid border-black hover:bg-black hover:text-white hover:shadow-md outline-0 transition-btn cursor-pointer"
          >
            <span>{t('btn-login')}</span>
          </button>
        </Link>
      ) : (
        <div className="relative flex items-center">
          <div className="md:hidden">
            <Link href="/account">
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
                  t('lang') ? 'ml-1' : 'mr-1'
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
      <div className="flex items-center mode mx-1">
        <div
          className={t('lang') ? 'ml-2' : 'mr-2'}
          onClick={() => {
            if (theme) document.body.classList.add('dark')
            else document.body.classList.remove('dark')
            localStorage.setItem('theme', (!theme).toString())
            setTheme(!theme)
          }}
        >
          <div className="flex items-center cursor-pointer">
            <label htmlFor="airplane-mode" className="mt-2">
              <span className="mx-1 text-[22px] filter-invert-dark">
                {theme ? '☀️' : '🌒'}
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
