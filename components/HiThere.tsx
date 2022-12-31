import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const HiThere = () => {
  const { t } = useTranslation()
  const [show, setShow] = useState(true)
  if (show)
    return (
      <div className="w-full z-10 fixed h-8 bottom-0 bg-slate-100 text-lg flex items-center justify-center">
        <button
          className="flex items-center justify-center ml-1 cursor-pointer text-[20px] text-white bg-black rounded-full h-5 w-5"
          onClick={() => setShow(false)}
        >
          ×
        </button>
        <span className="text-red-500 font-bold">{t('hi.there')}</span>
      </div>
    )
}

export default HiThere
