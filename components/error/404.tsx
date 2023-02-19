import Image from 'next/image'
import Link from 'next/link'
import { baseURL } from '@baseUrl'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <>
      <NextSeo
        title={
          t('lang')
            ? `این (url: ${router.asPath}) وجد ندارد`
            : `this (url: ${router.asPath}) there is no joy`
        }
        titleTemplate={
          t('lang')
            ? `این (url: ${router.asPath}) وجد ندارد`
            : `this (url: ${router.asPath}) there is no joy`
        }
        description={t('error.404')}
        canonical={baseURL + '404'}
        additionalMetaTags={[
          {
            name: 'apple-mobile-web-app-title',
            content: t('lang')
              ? `این (url: ${router.asPath}) وجد ندارد`
              : `this (url: ${router.asPath}) there is no joy`,
          },
        ]}
        openGraph={{
          url: baseURL + '404',
          title: `این (url: ${router.asPath}) وجد ندارد`,
          description: t('error.404'),
        }}
      />
      <div className="background-color bg-white">
        <div className="flex flex-col items-center">
          <Image
            src="/static/assets/img/page-not-found.svg"
            alt="یافت نشد"
            className="errorImage filter-invert-dark animation-img"
            priority
            width={330}
            height={330}
          />
          <h1 className="h4">{t('error') + ' 404'}</h1>
          <div className="text-gray-500 mb-6 overflow-auto font-medium">
            <span>{t('error.404')}</span>
          </div>
          <Link href="/">
            <button
              className="my_btn cursor-pointer text-white text-[14px]"
              type="button"
            >
              <span>{t('go.to.the.main.page')}</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
