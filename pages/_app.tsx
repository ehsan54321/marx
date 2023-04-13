import Layout from '@components/Layout'
import NProgress from 'nprogress'
import Router from 'next/router'
import Welcome from '@components/Welcome'
import { AuthProvider } from '@store/index'
import { ThemeProvider, useTheme } from 'next-themes'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import '@styles/globals.scss'
import type { AppProps } from 'next/app'

NProgress.configure({ showSpinner: false })
const App = ({ Component, pageProps }: AppProps) => {
  const { setTheme } = useTheme()
  const { t, i18n } = useTranslation()
  useEffect(() => {
    if (localStorage.getItem('lang') === 'en') i18n.changeLanguage('en')
    if (!localStorage.getItem('theme')) {
      if (matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark')
      }
    }
  }, [])
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  return (
    <>
      <Welcome />
      <AuthProvider>
        <div className={t('lang') ? 'fa' : 'en'}>
          <ThemeProvider enableSystem={true} attribute="class">
            <Layout>
              <div className="container-xl">
                <Component {...pageProps} />
              </div>
            </Layout>
          </ThemeProvider>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
