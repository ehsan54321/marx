import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const AdsComponents: React.FC = () => {
  const [show, setShow] = useState<boolean>(true)
  const { t } = useTranslation()
  const deShowHandler = () => {
    setShow(false)
    setTimeout(() => setShow(true), 10000)
  }
  return (
    <div className={!show ? 'hidden' : ''}>
      <span
        title={t('hiding')}
        onClick={deShowHandler}
        className="ads_hiding fixed mb-2 text-[15px] cursor-pointer p-2 left-4 z-10 rounded-lg bottom-40 leading-5 border border-gray-200 border-solid text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 transition"
      >
        {t('hiding')}
      </span>
      <a
        rel="nofollow"
        href="https://google.com"
        style={{
          backgroundImage:
            'url(https://www.armandl.com/wp-content/uploads/2016/08/Z5QGWb.gif)',
        }}
        className="fixed left-4 z-10 rounded-lg h-[120px] w-[125px] bottom-10"
      ></a>
    </div>
  )
}

export default AdsComponents
