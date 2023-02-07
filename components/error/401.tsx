import Image from 'next/image'
import Link from 'next/link'
import { baseURL } from '@baseUrl'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'react-i18next'

type Props = {
  children: string
  btn?: boolean
  btnHome?: boolean
}
const Error401 = ({ children, btn = false, btnHome = false }: Props) => {
  const { t } = useTranslation()
  return (
    <div className="background-color bg-white">
      <NextSeo
        title={t('error') + ' 401'}
        titleTemplate={t('error') + ' 401'}
        description={children}
        canonical={baseURL + '401'}
        openGraph={{
          url: baseURL + '401',
          title: t('error') + ' 401',
          description: children,
        }}
      />
      <div className="flex items-center flex-col">
        <Image
          src="/img/safe.svg"
          alt="یافت نشد"
          className="errorImage filter-invert-dark animation-img"
          priority
          width={330}
          height={330}
        />
        <h1 className="h4">{t('error') + ' 401'}</h1>
        <div className="text-gray-500 mb-6 overflow-auto">
          <span>{children}</span>
        </div>
        {btn && (
          <Link href="/auth#login">
            <button
              className="my_btn cursor-pointer text-white text-[14px]"
              type="button"
            >
              <span>{t('go.to.the.login.page')}</span>
            </button>
          </Link>
        )}
        {btnHome && (
          <Link href="/">
            <button
              className="my_btn cursor-pointer text-white text-[14px]"
              type="button"
            >
              <span>{t('go.to.the.main.page')}</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Error401
