import classNames from 'classnames'
import http from '@services/httpServices'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'sweetalert2'
import { AiFillHome, AiFillStar } from 'react-icons/ai'
import { AuthContext } from '@store/auth'
import { BsFillPersonFill, BsTranslate } from 'react-icons/bs'
import { FaBars, FaTimes } from 'react-icons/fa'
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
  return (
    <nav className="bg-white position-sticky layout_head top-0">
      <div className="container-xxl justify-content-between align-items-center d-flex h-100">
        <div className="d-flex">
          <div className="d-flex align-items-center justify-content-between">
            <ul className="d-contents">
              <li className="nav-item">
                <button
                  className="layout_toggle d-block d-sm-none me-2"
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
              <li className="nav-item d-none d-sm-flex layout_divider">
                <div className="vr h-100 mx-lg-2"></div>
              </li>
            </ul>
          </div>
          <div
            className={classNames(
              modal && 'layout_active',
              'layout_links align-items-center d-flex'
            )}
          >
            <ul className="d-block d-sm-flex m-sm-auto mt-3 align-items-center">
              <li className="ms-sm-1">
                <Link
                  href="/"
                  className={classNames(
                    'layout_link',
                    activePathName !== '' && 'text-secondary transition'
                  )}
                >
                  <AiFillHome className="me-1" />
                  <span>{t('home')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/stars"
                  className={classNames(
                    'layout_link',
                    activePathName !== 'stars' && 'text-secondary transition'
                  )}
                >
                  <AiFillStar className="me-1" />
                  <span>{t('stars')}</span>
                </Link>
              </li>

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
  const { isFind, setAuthState, authState, isAuth } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const router = useRouter()
  Router.events.on('routeChangeStart', () => setOpen(false))
  const Logout = () => {
    http
      .get('api/auth/logout')
      .then(() => {
        setAuthState(null)
        localStorage.removeItem('star')
        router.push('/auth#login')
        toast.fire({
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
      <div className="d-flex align-items-center me-2">
        <BsTranslate
          size={15}
          className="cursor-pointer"
          onClick={ChangeLang}
        />
      </div>
      {isFind() ? (
        <span className="loader" role="progressbar">
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
          <button type="button" className="btn btn-outline-dark">
            <span>{t('btn-login')}</span>
          </button>
        </Link>
      ) : (
        <div className="dropdoen">
          <div className="dropdown-toggle" onClick={() => setOpen(!open)}>
            <img
              // src="https://www.gravatar.com/avatar/24e96aef-6a72-4400-9a95-a926bad3fc69?s=185&d=identicon&r;=PG"
              // src="https://www.gravatar.com/avatar/4e7f0e6f71df72220e4ce37c92c377e3?s=185&d=identicon&r;=PG"
              src={authState.poster_path}
              className="rounded-circle"
              style={{ width: 40 }}
              alt={`${t('profile')} ${authState.username}`}
            />
          </div>
          <div>
            <ul
              className={
                open ? 'dropdown-menu d-block layout_drop' : 'dropdown-menu'
              }
            >
              <li>
                <Link
                  href="/account"
                  className={classNames(
                    'text-dark d-flex align-items-center dropdown-item',
                    router.pathname.split('/')[1] === 'account' &&
                      'active text-white'
                  )}
                >
                  <BsFillPersonFill />
                  <span className="ms-1">{t('profile')}</span>
                </Link>
              </li>
              <li onClick={Logout}>
                <div className="dropdown-item">
                  <HiLogout />
                  <span className="ms-2">{t('logout')}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
