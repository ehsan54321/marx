import AboutHome from '@components/AboutHome'
import AdsComponents from '../components/Ads'
import ControllerCoin from '@components/coins/ControllerCoins'
import http from '@services/httpServices'
import SEO from '@components/Seo'
import { useTranslation } from 'react-i18next'
import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  return http.get('api/coins').then((res) => {
    return {
      props: { data: res.data },
    }
  })
}
const HomePage = ({ data }) => {
  const { t } = useTranslation()
  // TODO api socket update value coins
  return (
    <>
      <SEO
        title={t('title.home')}
        keywords="bitcoin, وب سایت نمایش قیمت ارز های دجیتال, دجیتال بیت کوین, بیت کوین ,ارز دجیتال"
        description="وب سایت MyApp یک سایت نمایش قیمت ارز های دجیتال است مانند بیت کوین اتریوم تتر دوج کوین و غیر"
      />
      <AdsComponents />
      <h1 className="h5 mt-4 mb-4 h1_page">{t('list-coins')}</h1>
      <div className="background-color pt-4 pb-4 ps-1 pe-1">
        <ControllerCoin dataServer={data} />
      </div>
      <AboutHome />
    </>
  )
}

export default HomePage
