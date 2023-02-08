import { useState, useEffect } from 'react'

const Loader = () => {
  const [height, setHeight] = useState('auto')
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (footer) {
      setHeight(`calc(100vh - ${footer.clientHeight + 56 + 28 + 16}px)`)
    } else setHeight('100vh')
  }, [])
  return (
    <div className="flex items-center" style={{ height }}>
      <div className="loader loader--muted loader-container">
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
        <span className="loader__bars"></span>
      </div>
    </div>
  )
}

export default Loader
