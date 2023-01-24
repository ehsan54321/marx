import Image from 'next/image'
import Link from 'next/link'
import safeIcon from 'public/static/images/safe.svg'
import SEO from '@components/Seo'
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
      <SEO title={t('error') + ' 401'} url="401" noText />
      <div className="flex items-center flex-col">
        <Image
          src={safeIcon}
          alt="یافت نشد"
          className="errorImage filter-invert-dark animation-img"
          width={330}
          height={330}
        />
        <h1 className="h4">{t('error') + ' 401'}</h1>
        <div className="text-gray-500 mb-6 overflow-auto">
          <span>{children}</span>
        </div>
        {btn && (
          <Link href="/auth#login">
            <button className="my_btn text-white text-[14px]" type="button">
              <span>{t('go.to.the.login.page')}</span>
            </button>
          </Link>
        )}
        {btnHome && (
          <Link href="/">
            <button className="my_btn text-white text-[14px]" type="button">
              <span>{t('go.to.the.main.page')}</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Error401
