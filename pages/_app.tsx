import AuthProvider from '@store/auth'
import Layout from '@components/Layout'
import Loader from '@util/Loader'
import { Router } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@styles/globals.scss'
import '@store/i18n'
import type { AppProps } from 'next/app'

type AppCustomProps = { NoFooter: boolean; NoLayout: boolean }
const App = ({ Component, pageProps }: AppProps<AppCustomProps>) => {
  const [loaderStatus, setLoaderStatus] = useState<boolean>(false)
  const { i18n } = useTranslation()
  useEffect(() => {
    if (localStorage.getItem('lang') === 'en') i18n.changeLanguage('en')
  }, [])
  Router.events.on('routeChangeStart', () => setLoaderStatus(true))
  Router.events.on('routeChangeComplete', () => setLoaderStatus(false))
  return (
    <AuthProvider>
      <Layout NoLayout={pageProps.NoLayout} NoFooter={pageProps.NoFooter}>
        <div className="container-xl">
          {loaderStatus ? <Loader /> : <Component {...pageProps} />}
        </div>
      </Layout>
    </AuthProvider>
  )
}

export default App
