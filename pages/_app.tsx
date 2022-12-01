import AuthProvider from '@store/auth'
import classNames from 'classnames'
import Layout from '@components/Layout'
import Loader from '@util/Loader'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@styles/globals.scss'
import '@store/i18n'
import type { AppProps } from 'next/app'

type AppCustomProps = {
  NoFooter: boolean
  NoLayout: boolean
  NoContainer: boolean
}
const App = ({ Component, pageProps }: AppProps<AppCustomProps>) => {
  const [loaderStatus, setLoaderStatus] = useState<boolean>(false)
  const { i18n } = useTranslation()
  useEffect(() => {
    const langValue = localStorage.getItem('lang')
    if (langValue && langValue === 'en') i18n.changeLanguage(langValue)
  }, [])
  Router.events.on('routeChangeStart', () => setLoaderStatus(true))
  Router.events.on('routeChangeComplete', () => setLoaderStatus(false))
  return (
    <AuthProvider>
      <div className="d-flex flex-column vh-100 justify-content-between">
        <Layout NoLayout={pageProps.NoLayout} NoFooter={pageProps.NoFooter}>
          <>
            {loaderStatus && <Loader />}
            <div
              className={classNames(
                loaderStatus && 'd-none',
                !pageProps.NoContainer && 'container-xl'
              )}
            >
              <Component {...pageProps} />
            </div>
          </>
        </Layout>
      </div>
    </AuthProvider>
  )
}

export default App
