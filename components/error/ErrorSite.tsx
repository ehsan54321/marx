import Image from 'next/image'
import Meta from '@components/Meta'
import { useTranslation } from 'react-i18next'

const ErrorSite = () => {
  const { t } = useTranslation()
  return (
    <>
      <Meta
        title={t('error.server')}
        description={t('error.server')}
        keywords="500"
        canonical="500"
        noFeastTitle
      />
      <div className="background-color bg-white">
        <div className="flex flex-col items-center">
          <Image
            src="/static/assets/img/server-down.svg"
            alt="یافت نشد"
            className="errorImage filter-invert-dark animation-img"
            priority
            width={330}
            height={330}
          />
          <h1 className="h4">{t('error') + ' Network Error'}</h1>
          <div className="text-gray-500 mb-6 overflow-auto font-medium">
            <span>{t('error.server')}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorSite
