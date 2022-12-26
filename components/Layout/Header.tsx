import classNames from 'classnames'
import http from '@services/httpServices'
import Image from 'next/image'
import Link from 'next/link'
import sweetalert2 from 'sweetalert2'
import { AuthContext } from '@store/auth'
import { BsFillCaretDownFill, BsFillPersonFill } from 'react-icons/bs'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Fade } from 'react-reveal'
import { FcFaq } from 'react-icons/fc'
import { HiLogout } from 'react-icons/hi'
import { resErr } from '@lib/helper'
import { Router, useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const [modal, setModal] = useState<boolean>(false)
  const router = useRouter()
  const { t } = useTranslation()
  const activePathName = router.pathname.split('/')[1]
  Router.events.on('routeChangeStart', () => setModal(false))
  const height = () => {
    if (!modal) return 0
    if (activePathName) return 'calc(113.422px + 4rem)'
    else return '242px'
  }
  return (
    <nav
      className="bg-white position-sticky layout_head top-0"
      dir={t('lang') ? 'rtl' : 'ltr'}
    >
      <div className="container-xxl justify-content-between align-items-center d-flex h-100">
        <div className="d-flex">
          <div className="d-flex align-items-center justify-content-between">
            <ul className="d-contents">
              <li className="nav-item">
                <button
                  className={classNames(
                    'layout_toggle d-block d-sm-none',
                    t('lang') ? 'me-2' : 'ms-2'
                  )}
                  style={{ marginTop: 3 }}
                  onClick={() => setModal(!modal)}
                >
                  {modal ? <FaTimes /> : <FaBars />}
                </button>
              </li>
              <li className="nav-item">
                <Link href="/">
                  <Image
                    src="/static/images/favicon.ico"
                    alt="لوگو"
                    width={33}
                    height={33}
                    priority
                  />
                </Link>
              </li>
              <li
                className={classNames(
                  'nav-item d-xm-none',
                  t('lang') ? 'layout_divider' : 'layout_dividerEn'
                )}
              >
                <div className="vr h-100 mx-lg-2"></div>
              </li>
            </ul>
          </div>
          <div
            className={classNames(
              modal ? 'layout_active' : 'layout_col',
              'layout_links align-items-center d-flex'
            )}
            style={{
              height: height(),
            }}
          >
            <ul className="d-block d-sm-flex m-sm-auto mt-3 align-items-center">
              <li className="ms-sm-1">
                <Link
                  href="/"
                  className={
                    activePathName !== '' && 'text-secondary transition'
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15px"
                    height="15px"
                    viewBox="0 0 30 30"
                    className={t('lang') ? 'me-1' : 'ms-1'}
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
                      <path
                        fill="#a16a4a"
                        d="M18,17v11h-6V17H18 M19,16h-8v13h8V16L19,16z"
                      />
                    </g>
                    <path
                      fill="#a16a4a"
                      d="M16.5 22A0.5 0.5 0 1 0 16.5 23A0.5 0.5 0 1 0 16.5 22Z"
                    />
                  </svg>
                  <span>{t('home')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/stars"
                  className={
                    activePathName !== 'stars' && 'text-secondary transition'
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                    className={t('lang') ? 'me-1' : 'ms-1'}
                  >
                    <path
                      fill="#FFCA28"
                      d="M24 4.051L30.49 17.186 45 19.29 34.5 29.512 36.977 43.949 24 37.137 11.023 43.949 13.5 29.512 3 19.29 17.51 17.186z"
                    />
                  </svg>
                  <span>{t('stars')}</span>
                </Link>
              </li>
              {activePathName === '' && (
                <li>
                  <a href="#faq" className="text-secondary transition">
                    <FcFaq className={t('lang') ? 'me-1 mt-0' : 'ms-1 mt-0'} />
                    <span>{t('faq')}</span>
                  </a>
                </li>
              )}

              {modal && (
                <div className="vw-100 text-center">
                  <div className="d-flex justify-content-center pt-0">
                    <Auth />
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div className="d-none d-sm-flex">
          <Auth />
        </div>
      </div>
    </nav>
  )
}

const Auth = () => {
  const [show, setShow] = useState(false)
  const { isFind, setAuthState, authState, isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  const router = useRouter()
  const Logout = () => {
    http
      .get('api/v2/auth/logout')
      .then(() => {
        setAuthState(null)
        router.push('/auth#login')
        sweetalert2.fire({
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
      {isFind() ? (
        <span className={classNames('loader', t('lang') ? 'ms-3' : 'me-3')}>
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
        <>
          <ChangeMode />
          <Link href="/auth#login" className={t('lang') ? 'ms-2' : 'me-2'}>
            <button type="button" className="btn btn-outline-dark">
              <span>{t('btn-login')}</span>
            </button>
          </Link>
        </>
      ) : (
        <div
          className={classNames(
            'align-items-center position-relative layout_dup d-flex',
            t('lang') ? '' : 'layout_dupEN',
            show ? 'active' : ''
          )}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <div className="d-sm-none">
            <ChangeMode />
            <Link href="/account">
              <img
                src={authState.poster_path}
                className="rounded-circle ms-2"
                alt={`${t('profile')} ${authState.username}`}
                width="40px"
                height="auto"
              />
            </Link>
          </div>
          <button
            className="layout_dupBtn pe-0 bg-white d-xm-none"
            type="button"
          >
            <img
              src={authState.poster_path}
              className="rounded-circle me-1 h-auto"
              alt={`${t('profile')} ${authState.username}`}
            />
            <BsFillCaretDownFill />
          </button>
          <Fade when={show}>
            <ul className="layout_menu position-absolute bg-white">
              <Link href="/account" className="text-dark">
                <li className="layout_dupLi">
                  <BsFillPersonFill />
                  <span className={t('lang') ? 'ms-1' : 'me-1'}>
                    {t('profile')}
                  </span>
                </li>
              </Link>
              <div onClick={Logout}>
                <li className="layout_dupLi cursor-pointer">
                  <HiLogout />
                  <span className={t('lang') ? 'ms-2' : 'me-2'}>
                    {t('logout')}
                  </span>
                </li>
              </div>
            <div className="d-flex justify-content-center">
              <ChangeMode />
            </div>
            </ul>
          </Fade>
        </div>
      )}
    </>
  )
}

const ChangeMode = () => {
  const { t, i18n } = useTranslation()
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
      <div className="d-flex align-items-center">
        {/* <div className="d-flex me-2" onClick={() => setMod(!mod)}>
          <span className={classNames('switch d-flex', mod && 'switch_active')}>
            <FaSun
              size={15}
              className={classNames('cursor-pointer', mod && 'switch_icon')}
            />
            <MdNightlight
              size={15}
              className={classNames('cursor-pointer', !mod && 'switch_icon')}
            />
          </span>
        </div> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20px"
          height="20px"
          className="cursor-pointer"
          onClick={ChangeLang}
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
            fill="#FFF"
            d="M19.172,24h-4.36l-1.008,3H11l4.764-13h2.444L23,27h-2.805L19.172,24z M15.444,22h3.101l-1.559-4.714L15.444,22z"
          />
        </svg>
      </div>
    </>
  )
}

export default Header
