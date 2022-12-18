import Image from 'next/image'
import Link from 'next/link'
import SEO from '@components/Seo'
import { useTranslation } from 'react-i18next'

const ErrorSite = () => {
  const { t } = useTranslation()
  return (
    <>
      <SEO title={t('error.server')} noText />
      <div className="background-color bg-white">
        <div className="d-flex flex-column align-items-center">
          <Image
            src="/static/images/server-down.svg"
            alt="یافت نشد"
            className="errorImage"
            width={330}
            height={330}
          />
          <h1 className="h4">{t('error') + ' 503'}</h1>
          <div className="text-good mb-4" style={{ overflow: 'auto' }}>
            <span>{t('error.server')}</span>
          </div>
          <Link href="/">
            <button className="my_btn text-white font-14" type="button">
              <span>{t('go.to.the.main.page')}</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ErrorSite
