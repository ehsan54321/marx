import classNames from 'classnames'
import http from '@services/httpServices'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'sweetalert2'
import { AiFillHome, AiFillStar } from 'react-icons/ai'
import { AuthContext } from '@store/auth'
import { BsFillPersonFill, BsTranslate } from 'react-icons/bs'
import { Dropdown } from 'react-bootstrap'
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
    <nav className="bg-white container-xxl position-sticky layout_head align-items-center d-flex justify-content-between top-0">
      <div className="d-flex">
        <div className="d-flex align-items-center justify-content-between">
          <button
            className="layout_toggle d-block d-sm-none me-2"
            style={{ marginTop: 3 }}
            onClick={() => setModal(!modal)}
          >
            {modal ? <FaTimes /> : <FaBars />}
          </button>
          <Link href="/">
            <Image
              src="/static/images/favicon.ico"
              alt="لوگو"
              width={33}
              height={33}
            />
          </Link>
          <div
            className="divider divider-vertical d-none d-sm-flex layout_divider"
            role="separator"
          ></div>
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
                  <Auth mobile />
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className="d-none d-sm-flex">
        <Auth mobile={undefined} />
      </div>
    </nav>
  )
}

const Auth = ({ mobile }) => {
  const { isFind, setAuthState, authState, isAuth } = useContext(AuthContext)
  const { t, i18n } = useTranslation()
  const router = useRouter()
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
          timer: 6500,
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
        <Dropdown drop={mobile ? 'down' : 'start'}>
          <Dropdown.Toggle variant="width" className="border-0 p-sm-0">
            <img
              // src="https://www.gravatar.com/avatar/24e96aef-6a72-4400-9a95-a926bad3fc69?s=185&d=identicon&r;=PG"
              // src="https://www.gravatar.com/avatar/4e7f0e6f71df72220e4ce37c92c377e3?s=185&d=identicon&r;=PG"
              src={authState.poster_path}
              className="rounded-circle"
              style={{ width: 40 }}
              alt={`${t('profile')} ${authState.username}`}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Link
              href="/account"
              className={classNames(
                'dropdown-item text-dark d-flex align-items-center',
                router.pathname.split('/')[1] === 'account' &&
                  'active text-white'
              )}
            >
              <BsFillPersonFill />
              <span className="ms-1">{t('profile')}</span>
            </Link>
            <Dropdown.Item
              onClick={Logout}
              className="d-flex align-items-center"
            >
              <HiLogout />
              <span className="ms-2">{t('logout')}</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  )
}

export default Header
