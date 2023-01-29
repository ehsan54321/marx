import Head from 'next/head'
import { baseURL } from '@baseUrl'
import { useTranslation } from 'react-i18next'

type MetaProps = {
  title: string
  keywords: string
  description: string
  url: string
  noText?: boolean
}
const SEO = (props: MetaProps) => {
  const { title: titleText, keywords, description, noText, url } = props
  const { t } = useTranslation()
  const title = noText ? titleText : titleText + ' • ' + t('full.app')
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <link rel="canonical" href={baseURL + url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/favicon.ico" />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:site_name" content={t('full.app')} />
      <meta property="og:url" content={baseURL + url} />
      <meta property="og:type" content="website" />
      <meta name="expires" content="never" />
      <meta name="application-name" content={t('full.app')} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta
        name="google-site-verification"
        content="xkDxKK16KVjSTQv4vP93Dx0xztiwUEWrlX3_VzrUYcA"
      />
    </Head>
  )
}

SEO.defaultProps = {
  title: 'صفحه جدید',
}

export default SEO
