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
  const title = noText ? titleText : `${titleText} - MyApp`
  const icon = baseURL + 'static/images/favicon.ico'
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="enamad" content="" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-navbutton-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
      <link rel="shortcut icon" href={icon} />
      <link rel="icon" type="image/x-icon" href={icon} />
      <link rel="icon" href={icon} />
      <meta name="robots" content="noodp" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={baseURL} />
      <meta name="language" content="fa_IR" />
      <meta name="geo.region" content="IR" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={title} />
      <meta property="og:image" content={icon} />
      <meta property="og:image:alt" content="my-app" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:site_name" content="MyApp" />
      <meta property="og:url" content={baseURL} />
      <meta property="og:type" content="website" />
    </Head>
  )
}

SEO.defaultProps = {
  title: 'صفحه جدید',
}

export default SEO
