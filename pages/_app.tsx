import AuthProvider from '@store/auth'
import Layout from '@components/Layout'
import NProgress from 'nprogress'
import Router from 'next/router'
import ThemeProvider from '@store/theme'
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
          document.querySelector('body').classList.add('dark')
        }
      } else {
        if (matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme(false)
          document.querySelector('body').classList.add('dark')
        }
      }
    }
    getModes()
  }, [])
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  return (
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
  )
}

export default App
