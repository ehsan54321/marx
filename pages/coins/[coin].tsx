import Accordion from '@components/Accordion'
import http from '@services/httpServices'
import Link from 'next/link'
import SEO from '@components/Seo'
import { ControllerCoin, Share } from '@components/pageCoin'
import { useTranslation } from 'react-i18next'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const nameCoin: string | string[] = ctx.params.coin
  const props = (await http.get(`api/v2/coins/${nameCoin}`)).data

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
        keywords={`${props.coin.name}, نمایش قیمت ارز های دجیتال, دجیتال بیت کوین , بیت کوین ,ارز دجیتال`}
        description={props.coin.aboutCoin.body}
        url={'coins' + nameCoin}
      />
      <nav className="mt-6 mb-6 nav_page">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link className="hover:text-blue-500" href="/">
              {t('title.home')}
            </Link>
          </li>
          <li className="breadcrumb-item active">
            {t('lang') ? props.coin.name : props.coin.all_name}
          </li>
        </ul>
      </nav>

      <div className="background-color bg-white">
        <ControllerCoin {...props} nameCoin={nameCoin} />
      </div>
      <div className="background-color bg-white mt-4">
        <Share nameCoin={nameCoin} name={props.coin.name} />
      </div>
      <div className="background-color bg-white mt-4" id="common-questions">
        <h2 className="leading-7 font-bold h5 mr-4 mb-4">
          {t('introducing.coin')}
        </h2>
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
