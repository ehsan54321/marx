import Image from 'next/image'
import Link from 'next/link'
import SEO from '@components/Seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <>
      <SEO
        title={
          t('lang')
            ? `این (url: ${router.asPath}) وجد ندارد`
            : `this (url: ${router.asPath}) there is no joy`
        }
        noText
      />
      <div className="background-color bg-white">
        <div className="flex flex-col items-center">
          <Image
            src="/static/images/page-not-found.svg"
            alt="یافت نشد"
            className="errorImage"
            width={330}
            height={330}
          />
          <h1 className="h4">{t('error') + ' 404'}</h1>
          <div className="text-slate-400 mb-4 overflow-auto font-medium">
            <span>{t('error.404')}</span>
          </div>
          <Link href="/">
            <button className="my_btn text-white text-[14px]" type="button">
              <span>{t('go.to.the.main.page')}</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
