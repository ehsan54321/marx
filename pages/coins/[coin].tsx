import AdsComponents from '@components/Ads'
import ControllerPageCoin from '@components/pageCoin/ControllerCoin'
import http from '@services/httpServices'
import Link from 'next/link'
import SEO from '@components/Seo'
import { Accordion } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=31536000, stale-while-revalidate'
  )
  const nameCoin: string | string[] = ctx.params.coin
  const props = (await http.get(`api/coins/${nameCoin}`)).data

  return {
    notFound: !!(props === 'NotFound'),
    props: { props, nameCoin },
  }
}

const Coin = ({ props, nameCoin }) => {
  const { t } = useTranslation()
  return (
    <>
      <SEO
        title={t('lang') ? props.coin.name : props.coin.all_name}
        keywords={`${props.coin.name}, وب سایت نمایش قیمت ارز های دجیتال, دجیتال بیت کوین , بیت کوین ,ارز دجیتال`}
        description={props.coin.aboutCoin.body}
      />
      <AdsComponents />
      <nav className="mt-4 mb-4 nav_page">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">{t('list-coins')}</Link>
          </li>
          <li className="breadcrumb-item active">
            {t('lang') ? props.coin.name : props.coin.all_name}
          </li>
        </ol>
      </nav>

      <div className="background-color">
        <ControllerPageCoin {...props} nameCoin={nameCoin} />
      </div>
      <div className="background-color mt-3" style={{ color: '#27282c' }}>
        <h2 className="h1_page h5 ms-3 mb-3">
          {t('lang') ? 'معرفی کوین' : 'Introducing Coin'}
        </h2>
        <Accordion defaultActiveKey="faBody">
          <Accordion.Item eventKey="faBody">
            <Accordion.Header>به زبان فارسی</Accordion.Header>
            <Accordion.Body>
              <p className="accordion_list mb-1" dir="auto">
                {props.coin.aboutCoin.body}
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="enBody">
            <Accordion.Header>to Lang English</Accordion.Header>
            <Accordion.Body>
              <p className="accordion_list mb-1" dir="auto">
                {props.coin.aboutCoin.ENbody}
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  )
}

export default Coin