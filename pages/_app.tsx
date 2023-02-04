import AuthProvider from '@store/auth'
import Head from 'next/head'
import HiThere from '@components/HiThere'
import Layout from '@components/Layout'
import NProgress from 'nprogress'
import Router from 'next/router'
import ThemeProvider from '@store/theme'
import { baseURL } from '@baseUrl'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@styles/globals.scss'
import '@store/i18n'
import type { AppProps } from 'next/app'

NProgress.configure({ showSpinner: false })
const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<boolean>(true)
  const [hi, setHi] = useState<boolean>(false)
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
      if (!localStorage.getItem('lang')) {
        setHi(true)
        localStorage.setItem('lang', 'fa')
      }
    }
    getModes()
  }, [])
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  return (
    <>
      {hi && <HiThere />}
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
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="enamad" content="" />
        <meta name="robots" content="index, follow" />
        <meta name="robots" content="notranslate" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta name="revisit-after" content="15 days" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="MobileOptimized" content="310" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="alternate" hrefLang="fa-IR" href={baseURL} />
        <meta name="mobile-web-app-capable" content="yes" />
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
      </Head>
    </>
  )
}

export default App
