import Image from 'next/image'
import { baseURL } from '@baseUrl'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'react-i18next'

const ErrorSite = () => {
  const { t } = useTranslation()
  return (
    <>
      <NextSeo
        title={t('error.server')}
        titleTemplate={t('error.server')}
        description={t('error.server')}
        canonical={baseURL + '500'}
        additionalMetaTags={[
          { name: 'apple-mobile-web-app-title', content: t('error.server') },
        ]}
        openGraph={{
          url: baseURL + '500',
          title: t('error.server'),
          description: t('error.server'),
        }}
      />
      <div className="background-color bg-white">
        <div className="flex flex-col items-center">
          <Image
            src="/img/server-down.svg"
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
