import AuthProvider from '@store/auth'
import classNames from 'classnames'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import ThemeProvider from '@store/theme'
import { Router } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@styles/globals.scss'
import '@store/i18n'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  const [loaderStatus, setLoaderStatus] = useState<boolean>(false)
  const [refPage, setRefPage] = useState<boolean>(true)
  const [theme, setTheme] = useState<boolean>(true)
  const { i18n } = useTranslation()
  if (process.browser && refPage) {
    if (localStorage.getItem('lang') === 'en') {
      setTimeout(() => {
        setRefPage(false)
        i18n.changeLanguage('en')
      })
    }
    if (localStorage.getItem('theme') === 'false') {
      setTimeout(() => {
        setRefPage(false)
        setTheme(false)
      })
    }
  }
  Router.events.on('routeChangeStart', () => setLoaderStatus(true))
  Router.events.on('routeChangeComplete', () => setLoaderStatus(false))
  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <AuthProvider>
        <div
          className={classNames(
            'flex flex-col justify-between h-screen',
            theme ? '' : 'filter-invert-all'
          )}
        >
          <Layout>
            <div className="container-xl">
              {loaderStatus ? <Loader /> : <Component {...pageProps} />}
            </div>
          </Layout>
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
