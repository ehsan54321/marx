import useTranslation from '@/hooks/translation'
import { useEffect, useState } from 'react'

const Welcome = () => {
  const t = useTranslation()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('welcome')) {
      setShow(true)
      localStorage.setItem('welcome', 'true')
    }
  }, [])
  if (show)
    return (
      <div
        className="w-full z-30 fixed h-8 bottom-0 bg-slate-100 text-lg flex items-center justify-center"
        onClick={() => setShow(false)}
      >
        <span className="text-red-500 font-bold">{t('welcome')}</span>
      </div>
    )
}

export default Welcome
