import { useEffect, useState } from 'react'

const Install = () => {
  const [supportsPWA, setSupportsPWA] = useState<boolean>(false)
  const [promptInstall, setPromptInstall] = useState(null)
  useEffect(() => {
    const handler = (e) => {
      setSupportsPWA(true)
      setPromptInstall(e)
      e.preventDefault()
    }
    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('transitionend', handler)
  }, [])
  const installPwaApp = (e) => {
    if (!promptInstall) return
    promptInstall.prompt()
    e.preventDefault()
  }
  if (!supportsPWA) return
  return (
    <div className="bg-zinc-100 fixed bottom-7 w-96 z-20 left-10 rounded flex justify-between install">
      <div className="relative">
        <span
          className="absolute text-red-500 rounded-full w-6 top-[6.2px] cursor-pointer mr-1"
          onClick={() => setSupportsPWA(false)}
        >
          بستن
        </span>
        <div className="pr-11 mt-2">
          آیا می خواید از اپلکیشن ما استفاده کنید
        </div>
      </div>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer"
        onClick={installPwaApp}
      >
        <svg
          className="fill-current w-3.5 h-3.5 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        نصب
      </button>
    </div>
  )
}

export default Install
