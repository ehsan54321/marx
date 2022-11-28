import Image from 'next/image'
import Link from 'next/link'
import SEO from '@components/Seo'
import { AuthContext } from '@store/auth'
import { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const router = useRouter()
  const { isFind } = useContext(AuthContext)
  const ResultRef = useRef(null)
  const { t } = useTranslation()
  useEffect(() => {
    if (!isFind()) location.reload()
  }, [router])
  useEffect(() => {
    ResultRef.current.innerText = t('lang')
      ? `این (url: ${router.asPath}) وجد ندارد`
      : `this (url: ${router.asPath}) there is no joy`
  }, [router.asPath, t])
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
        <div className="d-flex flex-column align-items-center">
          <Image
            src="/static/images/page-not-found.svg"
            alt="یافت نشد"
            className="notFond_content"
            width={330}
            height={330}
          />
          <h1 className="h4">{t('error') + ' 404'}</h1>
          <div className="text-good mb-4">
            <span ref={ResultRef}>{t('error.404')}</span>
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

export default NotFound
