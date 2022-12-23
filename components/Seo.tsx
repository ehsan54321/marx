import Head from 'next/head'
import { baseURL } from '@baseUrl'

type MetaProps = {
  title?: string
  keywords?: string
  description?: string
  noText?: boolean
}
const SEO = (props: MetaProps) => {
  const { title: titleText, keywords, description, noText } = props
  const title = noText ? titleText : titleText + ' | MyApp'
  const icon = baseURL + 'static/images/favicon.ico'
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="enamad" content="" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-navbutton-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
      <link rel="shortcut icon" href={icon} />
      <link rel="shortcut icon" type="image/x-icon" href={icon} />
      <link rel="icon" href={icon} />
      <meta name="robots" content="noodp" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={baseURL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={icon} />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:site_name" content="MyApp" />
      <meta property="og:url" content={baseURL} />
      <meta property="og:type" content="website" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={baseURL} />
      <meta name="apple-mobile-web-app-title" content="MyApp" />
      <meta name="application-name" content="MyApp" />
      <link rel="alternate" hrefLang="fa-IR" href={baseURL} />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}

SEO.defaultProps = {
  title: 'صفحه جدید',
}

export default SEO
