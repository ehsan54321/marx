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
    <div className={!show ? 'd-none' : ''}>
      <span
        className="ads_hiding position-fixed mb-2 font-15 cursor-pointer p-2"
        title={t('hiding')}
        onClick={deShowHandler}
      >
        {t('hiding')}
      </span>
      <a
        rel="nofollow"
        href="https://google.com"
        className="ads_content position-fixed"
      ></a>
    </div>
  )
}

export default AdsComponents
