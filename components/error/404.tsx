import Link from 'next/link'
import Meta from '@/components/Meta'
import useTranslation from '@/hooks/translation'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()
  const t = useTranslation()
  return (
    <>
      <Meta
        title={
          t('dir') === 'rtl'
            ? `این (url: ${router.asPath}) وجد ندارد`
            : `this (url: ${router.asPath}) there is no joy`
        }
        description={t('error.404')}
        keywords={['404', t('error') + ' 404']}
        noFeastTitle
      />
      <div className="background-color bg-white">
        <div className="flex items-center h-full p-16">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <h1 className="mb-8 font-extrabold text-[100px] text-gray-600">
                <span className="max-[620px]:hidden">{t('error')}</span> 404
              </h1>
              {/* <p className="text-2xl font-semibold md:text-3xl">
                title
              </p> */}
              <p className="mt-4 mb-8 text-gray-400">{t('error.404')}</p>
              <Link
                href="/"
                locale={t('lang')}
                className="px-8 py-3 font-semibold rounded bg-violet-400 btn-404 relative flex justify-center items-center overflow-hidden"
              >
                {t('go.to.the.main.page')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
