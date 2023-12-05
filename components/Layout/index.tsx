import classNames from 'classnames'
import Footer from './Footer'
import Header from './Header'
import Loader from '../Loader'
import Router, { useRouter } from 'next/router'
import { FaArrowUp } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const Layout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter()
  const [show, setShow] = useState<boolean>(true)
  if (!(router.pathname === '/auth')) {
    return (
      <>
        <div className={show ? '' : 'hidden'}>
          <div>
            <Header setShow={setShow} />
            <Progress />
            <ScrollTop />
            {children}
          </div>
          <Footer />
        </div>

        {!show && <Loader />}
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
    const winScroll = scrollY
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
      <div className="z-20 sticky right-0 mb-6 top-14">
        <div className="h-[5px] w-full">
          <div
            className="h-full w-0 bg-slate-500"
            style={{ width: width + '%' }}
          />
        </div>
      </div>
    )
  } else {
    return <div className="mb-6 pb-1" />
  }
}

const ScrollTop = () => {
  const [show, setShow] = useState(false)
  const getShow = () => {
    addEventListener('scroll', () => {
      if (innerHeight / 2 <= pageYOffset) setShow(true)
      else setShow(false)
    })
  }
  useEffect(() => {
    getShow()
  }, [])
  const topPage = () => scroll({ top: 0 })
  return (
    <div
      className={classNames(
        'fixed bg-white py-2.5 px-[12.7px] rounded-full z-20 cursor-pointer shadow border border-solid border-zinc-100 transition-all duration-[.5s]',
        show ? 'bottom-[15px] right-4' : '-bottom-16 -right-16'
      )}
      onClick={topPage}
    >
      <button className="head_scrollTop bg-transparent cursor-pointer">
        <FaArrowUp size={18} />
      </button>
    </div>
  )
}

export default Layout
