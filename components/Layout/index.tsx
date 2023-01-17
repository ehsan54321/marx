import classNames from 'classnames'
import Footer from './Footer'
import Header from './Header'
import Router from 'next/router'
import { FaChevronUp } from 'react-icons/fa'
import { ThemeContext } from '@store/theme'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Layout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter()
  if (!(router.pathname === '/auth')) {
    return (
      <>
        <div>
          <Header />
          <Progress />
          <ScrollTop />
          {children}
        </div>
        <Footer />
      </>
    )
  } else return children
}

const Progress = () => {
  const [width, setWidth] = useState<number>(0)
  const [show, setShow] = useState<boolean>(false)
  const restStates = () => {
    setShow(false)
    setWidth(0)
  }
  Router.events.on('routeChangeStart', restStates)
  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    if (winScroll === 0 || height === 0) setShow(false)
    else {
      const scroll = (winScroll / height) * 100
      setShow(true)
      setWidth(scroll)
    }
  }
  useEffect(() => {
    addEventListener('scroll', onScroll)
  }, [])
  if (show) {
    return (
      <div className="z-10 bg-white sticky right-0 mb-6 top-16">
        <div className="h-[5px] w-full">
          <div
            className="h-full w-0 bg-slate-500"
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>
    )
  } else {
    return <div className="mb-6 pb-1"></div>
  }
}

const ScrollTop = () => {
  const [show, setShow] = useState(false)
  const { theme } = useContext(ThemeContext)
  const getShow = () => {
    addEventListener('scroll', () => {
      if (document.documentElement.clientHeight - 240 <= pageYOffset) {
        setShow(true)
      } else setShow(false)
    })
  }
  useEffect(() => {
    getShow()
  }, [])
  const topPage = () => scroll({ top: 0 })
  return (
    <button
      className={classNames(
        'fixed bg-white layout_scrollTop py-2 px-[12px] rounded-full z-20 cursor-pointer',
        show ? 'bottom-[15px] right-4' : 'bottom-[-40px] right-[-20px]',
        theme ? '' : 'hidden'
      )}
      onClick={topPage}
    >
      <FaChevronUp />
    </button>
  )
}

export default Layout
