import { useState, useEffect } from 'react'
import Router from 'next/router'

const Progress = () => {
  const [width, setWidth] = useState<number>(0)
  Router.events.on('routeChangeStart', () => setWidth(0))
  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const scroll = (winScroll / height) * 100
    setWidth(scroll)
  }
  useEffect(() => {
    addEventListener('scroll', () => onScroll())
  }, [])
  return (
    <div className="wrapper position-sticky start-0 top-0">
      <div className="progressBar w-100">
        <div className="progressMain" style={{ width: `${width}%` }}></div>
      </div>
    </div>
  )
}

export default Progress
