import AuthProvider from '@/store/auth'
import Layout from '@/components/Layout'
import NProgress from 'nprogress'
import Router from 'next/router'
import useTranslation from '@/hooks/translation'
import Welcome from '@/components/Welcome'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.scss'

NProgress.configure({ showSpinner: false })
const App = ({ Component, pageProps }) => {
  const t = useTranslation()
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())
  return (
    <>
      <Welcome />
      <AuthProvider>
        <div className={t('dir') === 'rtl' ? 'fa' : 'en'}>
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

export default appWithTranslation(App)
