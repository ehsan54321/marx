import Image from 'next/image'
import SEO from '@components/Seo'
import { useTranslation } from 'react-i18next'

const ErrorSite = () => {
  const { t } = useTranslation()
  return (
    <>
      <SEO title={t('error.server')} noText />
      <div className="background-color bg-white">
        <div className="flex flex-col items-center">
          <Image
            src="/static/images/server-down.svg"
            alt="یافت نشد"
            className="errorImage"
            width={330}
            height={330}
          />
          <h1 className="h4">{t('error') + ' Network Error'}</h1>
          <div className="ttext-slate-500 mb-6 overflow-auto font-medium">
            <span>{t('error.server')}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorSite
