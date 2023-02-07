import AuthProvider from '@store/auth'
import Head from 'next/head'
import Layout from '@components/Layout'
import NProgress from 'nprogress'
import Router from 'next/router'
import ThemeProvider from '@store/theme'
import Welcome from '@components/Welcome'
import { baseURL } from '@baseUrl'
import { DefaultSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@styles/globals.scss'
import '@store/i18n'
import type { AppProps } from 'next/app'

NProgress.configure({ showSpinner: false })
const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<boolean>(true)
  const { t, i18n } = useTranslation()
  useEffect(() => {
    const getModes = () => {
      if (localStorage.getItem('lang') === 'en') i18n.changeLanguage('en')
      const themeLocal = localStorage.getItem('theme')
      if (themeLocal) {
        if (themeLocal === 'false') {
          setTheme(false)
          document.querySelector('html').classList.add('dark')
        }
      } else {
        if (matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme(false)
          document.querySelector('html').classList.add('dark')
        }
      }
    }
    getModes()
  }, [])
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  return (
    <>
      <Welcome />
      <AuthProvider>
        <div className={t('lang') ? 'fa' : 'en'}>
          <ThemeProvider value={{ theme, setTheme }}>
            <Layout>
              <div className="container-xl">
                <Component {...pageProps} />
              </div>
            </Layout>
          </ThemeProvider>
        </div>
      </AuthProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        /> */}
      </Head>
      <DefaultSeo
        title="صفحه جدید"
        canonical={baseURL}
        robotsProps={{ notranslate: true }}
        languageAlternates={[{ hrefLang: 'fa-IR', href: baseURL }]}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
          { name: 'application-name', content: t('full.app') },
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
          { name: 'format-detection', content: 'telephone=no' },
          { name: 'MobileOptimized', content: '310' },
          { name: 'mobile-web-app-capable', content: 'yes' },
          {
            name: 'google-site-verification',
            content: 'xkDxKK16KVjSTQv4vP93Dx0xztiwUEWrlX3_VzrUYcA',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'apple-touch-icon',
            sizes: '36x36',
            href: '/favicon-36x36.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '96x96',
            href: '/favicon-96x96.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '144x144',
            href: '/favicon-144x144.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '192x192',
            href: '/favicon-192x192.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '512x512',
            href: '/favicon-512x512.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '36x36',
            href: '/favicon-36x36.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '96x96',
            href: '/favicon-96x96.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            href: '/favicon-192x192.png',
          },
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: 'shortcut icon', href: '/favicon.ico' },
          {
            rel: 'manifest',
            href: '/manifest.json',
          },
        ]}
        openGraph={{
          url: baseURL,
          type: 'website',
          locale: 'fa_IR',
          images: [{ url: baseURL + 'favicon.ico', alt: 'صرافی مارکس کت' }],
          siteName: t('full.app'),
        }}
      />
    </>
  )
}

export default App
