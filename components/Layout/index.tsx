import classNames from 'classnames'
import Footer from './Footer'
import Header from './Header'
import Router from 'next/router'
import { FaChevronUp } from 'react-icons/fa'
import { useEffect, useState } from 'react'

type Props = {
  children: JSX.Element
  NoLayout: boolean
  NoFooter: boolean
}
const Layout = ({ children, NoLayout, NoFooter }: Props) => {
  if (!NoLayout)
    return (
      <>
        <div>
          <Header />
          <Progress />
          <ScrollTop />
          {children}
        </div>
        <Footer NoFooter={NoFooter} />
      </>
    )
  else return children
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
      setWidth(scroll - 0.1)
    }
  }
  useEffect(() => {
    addEventListener('scroll', onScroll)
  }, [])
  if (show) {
    return (
      <div className="layout_wrapper bg-white position-sticky start-0 mb-4">
        <div className="layout_progressBar w-100">
          <div
            className="layout_progressMain h-100"
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>
    )
  } else {
    return <div className="mb-4 pb-1"></div>
  }
}

const ScrollTop = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.documentElement.clientHeight - 240 <= window.pageYOffset) {
        setShow(true)
      } else setShow(false)
    })
  }, [])
  const topPage = () => window.scroll({ top: 0, behavior: 'smooth' })
  return (
    <button
      className={classNames(
        'btn position-fixed bg-white layout_scrollTop',
        show ? 'opacity-1' : 'opacity-0'
      )}
      onClick={topPage}
    >
      <FaChevronUp />
    </button>
  )
}

export default Layout
