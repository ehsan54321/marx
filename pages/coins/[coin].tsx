import ControllerPageCoin from '@components/pageCoin/ControllerCoin'
import http from '@services/httpServices'
import Link from 'next/link'
import SEO from '@components/Seo'
import Share from '@components/pageCoin/Share'
import { useTranslation } from 'react-i18next'
import type { GetServerSideProps } from 'next'
import Accordion from '@components/Accordion'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
      <nav className="mt-4 mb-4 nav_page">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link className="hover:secondary" href="/">
              {t('list-coins')}
            </Link>
          </li>
          <li className="breadcrumb-item active">
            {t('lang') ? props.coin.name : props.coin.all_name}
          </li>
        </ul>
      </nav>

      <div className="background-color bg-white">
        <ControllerPageCoin {...props} nameCoin={nameCoin} />
      </div>
      <div className="background-color bg-white mt-3">
        <Share nameCoin={nameCoin} name={props.coin.name} />
      </div>
      <div className="background-color bg-white mt-3">
        <h2 className="h1_page h5 ms-3 mb-3">{t('introducing.coin')}</h2>
        <Accordion
          title={{ one: 'به زبان فارسی', tow: 'to Lang English' }}
          di={{
            one: props.coin.aboutCoin.body,
            tow: props.coin.aboutCoin.ENbody,
          }}
        />
      </div>
    </>
  )
}

export default Coin
