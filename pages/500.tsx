import { ErrorSite } from '@/components/error'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

const ErrorPage = () => <ErrorSite />
export default ErrorPage
