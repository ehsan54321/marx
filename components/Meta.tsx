import Head from 'next/head'
import locales from '@/lib/locales'
import useTranslation from '@/hooks/translation'
import { baseURL } from '@/config'
import { useRouter } from 'next/router'

interface Props {
  title: string
  description: string
  keywords: string[]
  noFeastTitle?: boolean
}
const Meta = (props: Props) => {
  const { title, description, keywords, noFeastTitle } = props
  const t = useTranslation()
  const router = useRouter()
  const defaults_keywords = [
    'مارکس کت',
    'مارکس',
    'صرافی مارکس کت',
    'Marxket',
    'Marx',
  ]
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>{title + (noFeastTitle ? '' : t('title'))}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={[...defaults_keywords, ...keywords].join(', ')}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content={t('full.app')} />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="MobileOptimized" content="310" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:url" content={baseURL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={baseURL + 'favicon.ico'} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={baseURL} />
        <meta
          name="twitter:title"
          content={title + (noFeastTitle ? '' : t('title'))}
        />
        <meta name="twitter:image" content={baseURL + 'favicon.ico'} />
        <meta name="twitter:description" content={description} />

        {locales.map((locale) => (
          <meta
            property={
              router.locale === locale.code
                ? 'og:locale'
                : 'og:locale:alternative'
            }
            content={locale.code}
            key={locale.code}
          />
        ))}

        <link
          rel="apple-touch-icon"
          sizes="36x36"
          href={baseURL + 'favicon-36x36.png'}
        />
        <link
          rel="apple-touch-icon"
          sizes="96x96"
          href={baseURL + 'favicon-96x96.png'}
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href={baseURL + 'favicon-144x144.png'}
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href={baseURL + 'favicon-192x192.png'}
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href={baseURL + 'favicon-512x512.png'}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="36x36"
          href={baseURL + 'favicon-36x36.png'}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href={baseURL + 'favicon-96x96.png'}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={baseURL + 'favicon-192x192.png'}
        />
        <link rel="icon" href={baseURL + 'favicon.ico'} />
        <link rel="manifest" href={baseURL + 'manifest.json'} />
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
