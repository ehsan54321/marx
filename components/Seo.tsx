import Head from 'next/head'
import { baseURL } from '@baseUrl'

type MetaProps = {
  title?: string
  keywords?: string
  description?: string
  url?: string
  noText?: boolean
}
const SEO = (props: MetaProps) => {
  const { title: titleText, keywords, description, noText, url } = props
  const title = noText ? titleText : titleText + ' • MyApp'
  const icon = baseURL + 'static/images/favicon.ico'
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="enamad" content="" />
      <link rel="shortcut icon" href={icon} />
      <link rel="shortcut icon" type="image/x-icon" href={icon} />
      <link rel="icon" href={icon} />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <link rel="canonical" href={baseURL + url} />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={baseURL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={icon} />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:site_name" content="MyApp" />
      <meta property="og:url" content={baseURL + url} />
      <meta property="og:type" content="website" />
      <meta name="google" content="notranslate" />
      <meta name="MobileOptimized" content="310" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={baseURL} />
      <meta name="application-name" content="MyApp" />
      <link rel="alternate" hrefLang="fa-IR" href={baseURL} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}

SEO.defaultProps = {
  title: 'صفحه جدید',
}

export default SEO
