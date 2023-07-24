import AuthProvider from '@/store/auth'
import Layout from '@/components/Layout'
import NProgress from 'nprogress'
import  { useRouter } from 'next/router'
import useTranslation from '@/hooks/translation'
import Welcome from '@/components/Welcome'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.scss'
import { useEffect } from 'react'

NProgress.configure({ showSpinner: false })
const App = ({ Component, pageProps }) => {
  const t = useTranslation()
  const router= useRouter()
  
  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
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
