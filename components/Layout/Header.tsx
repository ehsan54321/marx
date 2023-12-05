import classNames from 'classnames'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import useTranslation from '@/hooks/translation'
import { FcFaq } from 'react-icons/fc'
import { Link as LinkScroll } from 'react-scroll/modules'
import { useState } from 'react'
import Auth from './Heder/HeaderAuth'

const Header = ({ setShow }) => {
  const [modal, setModal] = useState<boolean>(false)
  const router = useRouter()
  const t = useTranslation()
  const activePathName = router.pathname.split('/')[1]
  Router.events.on('routeChangeStart', () => setModal(false))
  const marg = t('dir') === 'rtl' ? 'ml-1' : 'mr-1'
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
      className="bg-white sticky head_ z-30 top-0 h-14"
      dir={t('dir') === 'rtl' ? 'rtl' : 'ltr'}
    >
      <div className="container-xxl justify-between items-center flex h-full">
        <div className="flex">
          <div className="flex items-center justify-between">
            <ul className="contents">
              <li className="nav-item">
                <button
                  className={classNames(
                    'block md:hidden bg-transparent',
                    t('dir') === 'rtl' ? 'ml-2.5' : 'mr-2.5'
                  )}
                  onClick={() => setModal(!modal)}
                >
                  <div
                    className={classNames(
                      'block w-6 h-1 bg-black transition-all ease-in-out duration-500 my-1 rounded',
                      modal ? 'active' : ''
                    )}
                    id="one"
                  />
                  <div
                    className={classNames(
                      'block w-6 h-1 bg-black my-1 rounded',
                      modal ? 'opacity-0' : ''
                    )}
                  />
                  <div
                    className={classNames(
                      'block w-6 h-1 bg-black transition-all ease-in-out duration-500 my-1 rounded',
                      modal ? 'active' : ''
                    )}
                    id="three"
                  />
                </button>
              </li>
              <li className="nav-item">
                <Link
                  href="/"
                  locale={t('lang')}
                  className="flex"
                  prefetch={false}
                >
                  <img
                    src="/favicon-96x96.png"
                    alt="لوگو"
                    className="w-[34px] h-[34px]"
                  />
                  <span
                    className={classNames(
                      'font-bold text-[15px] mt-[6px] md:hidden text-black',
                      t('dir') === 'rtl' ? 'mr-2' : 'ml-2'
                    )}
                  >
                    MAR<span className="text-red-500">X</span>
                  </span>
                </Link>
              </li>
              <li
                className={classNames(
                  'nav-item max-md:hidden h-6',
                  t('dir') === 'rtl' ? 'head_divider' : 'head_dividerEn'
                )}
              >
                <div className="vr h-full lg:mx-2" />
              </li>
            </ul>
          </div>
          <div
            className={classNames(
              modal ? 'head_active' : 'md:h-[auto!important]',
              'head_links items-center flex bg-white overflow-hidden'
            )}
            style={{ height: height() }}
          >
            <ul className="block md:flex md:m-auto mt-4 items-center">
              <Link
                href="/"
                prefetch={false}
                locale={t('lang')}
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
                prefetch={false}
                locale={t('lang')}
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
                prefetch={false}
                locale={t('lang')}
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
                <LinkScroll
                  to="FAQ"
                  offset={-99}
                  className="font-medium px-4 py-1 rounded-lg md:hover:bg-slate-100 text-lg md:inline block md:leading-1 leading-10 head_lastItem"
                >
                  <FcFaq
                    className={classNames('filter-invert-dark mt-0', marg)}
                  />
                  <span className="text-slate-500">{t('faq')}</span>
                </LinkScroll>
              )}

              {modal && (
                <div className="w-screen text-center">
                  <div className="flex justify-center pt-0">
                    <Auth setShow={setShow} />
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div className="hidden md:flex items-center">
          <Auth setShow={setShow} />
        </div>
      </div>
    </nav>
  )
}

export default Header
