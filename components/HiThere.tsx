import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const HiThere = () => {
  const { t } = useTranslation()
  const [show, setShow] = useState(true)
  if (show)
    return (
      <div
        className="w-full z-30 fixed h-8 bottom-0 bg-slate-100 text-lg flex items-center justify-center"
        onClick={() => setShow(false)}
      >
        <span className="text-red-500 font-bold">{t('hi.there')}</span>
      </div>
    )
}

export default HiThere
