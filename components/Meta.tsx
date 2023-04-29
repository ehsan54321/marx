import Head from 'next/head'
import { baseURL } from '@baseUrl'
import { useTranslation } from 'react-i18next'

interface Props {
  title: string
  description?: string
  keywords?: string
  canonical?: string
  noFeastTitle?: boolean
}
const Meta = (props: Props) => {
  const { title, description, keywords, canonical = '', noFeastTitle } = props
  const { t } = useTranslation()
  const newTitle = title + (noFeastTitle ? '' : t('title'))
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>{newTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {/* <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" /> */}
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content={t('full.app')} />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="MobileOptimized" content="310" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={baseURL + canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="favicon.ico" />
        <meta property="og:image:alt" content="صرافی مارکس کت" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:site_name" content="مارکس کت" />
        <link rel="canonical" href={baseURL + canonical} />
        <meta name="robots" content="index, follow" />
        <link rel="apple-touch-icon" sizes="36x36" href="/favicon-36x36.png" />
        <link rel="apple-touch-icon" sizes="96x96" href="/favicon-96x96.png" />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/favicon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/favicon-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="36x36"
          href="/favicon-36x36.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-192x192.png"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="google-site-verification"
          content="xkDxKK16KVjSTQv4vP93Dx0xztiwUEWrlX3_VzrUYcA"
        />
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        /> */}
      </Head>
    </div>
  )
}

export default Meta
