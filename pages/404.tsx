import { NotFound as NotFoundComponent } from '@/components/error'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const NotFoundPage = () => <NotFoundComponent />
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
export default NotFoundPage
