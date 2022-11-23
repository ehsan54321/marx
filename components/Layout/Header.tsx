import classNames from 'classnames'
import http from '@services/httpServices'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'sweetalert2'
import { AuthContext } from '@store/auth'
import { Dropdown, Nav, Navbar } from 'react-bootstrap'
import { resErr } from '@lib/helper'
import { Router, useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Header: React.FC = () => {
  const [mobile, setMobile] = useState<boolean>(false)
  const { t } = useTranslation()
  Router.events.on('routeChangeStart', () => setMobile(false))
  return (
    <header className="shadow-sm bg-white position-fixed top-0 end-0 vw-100 layout_head">
      <Navbar
        bg="light"
        variant="light"
        className="ps-3 pe-3 bg-white container-xxl"
      >
        <Navbar.Brand className="p-0 m-0 me-1">
          <Link href="/">
            <Image
              src="/static/images/favicon.ico"
              alt="لوگو"
              width={33}
              height={33}
            />
          </Link>
        </Navbar.Brand>

        <div
          className="divider divider-vertical d-none d-sm-flex layout_divider"
          role="separator"
        ></div>

        <Nav className="ml-auto flex-column flex-sm-row mb-sm-0 mb-3 d-none d-sm-flex">
          <Items />
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <div className="d-none d-sm-flex">
            <Auth mobile={undefined} />
          </div>
          <div className="d-flex d-sm-none">
            <button
              type="button"
              className="btn p-1"
              onClick={() => setMobile(true)}
            >
              <i className="bi bi-list h1 m-0 d-flex"></i>
            </button>
          </div>
        </Navbar.Collapse>
      </Navbar>

      <div
        className={classNames(
          'offcanvas offcanvas-end d-sm-none',
          mobile ? 'show' : 'hiding'
        )}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">{t('list-facilities-site')}</h5>
          <button
            type="button"
            className="btn-close btn"
            onClick={() => setMobile(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          <Nav className="ml-auto flex-column flex-sm-row mb-sm-0 mb-3 d-flex">
            <Items />
          </Nav>
          <div className="d-flex justify-content-center mt-2">
            <Auth mobile />
          </div>
        </div>
      </div>
    </header>
  )
}

const Items: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const activePathName = router.pathname.split('/')[1]
  return (
    <>
      <div className="d-flex font-15-5">
        <Link
          href="/"
          className={classNames(
            'nav-link',
            activePathName === '' ? 'text-dark' : 'text-secondary transition'
          )}
        >
          <i className="me-1 bi bi-house-fill"></i>
          <span>{t('home')}</span>
        </Link>
      </div>

      <div className="d-flex align-items-center font-15-5">
        <Link
          href="/stars"
          className={classNames(
            'nav-link',
            activePathName === 'stars'
              ? 'text-dark'
              : 'text-secondary transition'
          )}
        >
          <i className="me-1 bi bi-star-fill"></i>
          <span>{t('stars')}</span>
        </Link>
      </div>
    </>
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
      <div className="d-flex align-items-center me-1">
        <i
          className="me-1 bi bi-translate cursor-pointer"
          onClick={ChangeLang}
        ></i>
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
              <i className="bi bi-person font-18 d-flex layout_profile"></i>
              <span className="ms-1">{t('profile')}</span>
            </Link>
            <Dropdown.Item
              onClick={Logout}
              className="d-flex align-items-center"
            >
              <i className="bi bi-box-arrow-in-right font-18 d-flex"></i>
              <span className="ms-2">{t('logout')}</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  )
}

export default Header
