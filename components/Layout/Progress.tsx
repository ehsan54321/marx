import Router from 'next/router'
import { useEffect, useState } from 'react'

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

export default Progress
