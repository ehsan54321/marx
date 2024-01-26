import Accordion from '@/components/Accordion'
import http from '@/services/httpServices'
import Link from 'next/link'
import Meta from '@/components/Meta'
import { ControllerCoin, Share } from '@/components/pageCoin'
import { HiCloudDownload } from 'react-icons/hi'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useTranslation from '@/hooks/translation'

export const getServerSideProps = async (ctx) => {
  const nameCoin: string | string[] = ctx.params.coin
  const props = (await http.get(`api/v2/coins/${nameCoin}`)).data

  return {
    notFound: !!(props === 'NotFound'),
    props: {
      props,
      nameCoin,
      ...(await serverSideTranslations(ctx.locale, ['common'])),
    },
  }
}

const Coin = ({ props, nameCoin }) => {
  const t = useTranslation()
  return (
    <>
      <Meta
        title={t('dir') === 'rtl' ? props.coin.name : props.coin.all_name}
        description={props.coin.aboutCoin.body}
        keywords={[
          props.coin.name,
          'نمایش قیمت ارز های دجیتال',
          'دجیتال بیت کوین',
          'بیت کوین',
        ]}
      />
      <nav className="mt-6 mb-6">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link className="hover:text-blue-500" href="/" locale={t('lang')}>
              {t('home')}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              className="hover:text-blue-500"
              href="/coins"
              locale={t('lang')}
            >
              {t('title.home')}
            </Link>
          </li>
          <li className="breadcrumb-item active">
            {t('dir') === 'rtl' ? props.coin.name : props.coin.all_name}
          </li>
        </ul>
      </nav>

      <div className="background-color bg-white">
        <ControllerCoin {...props} nameCoin={nameCoin} />
      </div>
      <div className="background-color bg-white mt-4">
        <Share nameCoin={nameCoin} name={props.coin.name} />
        <div className="flex justify-between items-center mt-4 mx-2">
          <div className="flex text-slate-500 mt-1">
            <div className="ml-1">
              <HiCloudDownload size={15} />
            </div>
            <span className="text-[14px]">
              {t('download.icon') +
                ' ' +
                (t('dir') === 'rtl' ? props.coin.name : props.coin.all_name)}
            </span>
          </div>
          <button
            type="submit"
            className="px-3 text-white inline-block py-1.5 text-base cursor-pointer rounded-md bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 outline-0 transition-btn"
            onClick={() => {
              const link = document.createElement('a')
              link.download = props.coin.all_name + '-' + nameCoin + '.svg'
              link.href = `/static/assets/img/coins/${props.coin.poster_path}.svg`
              link.click()
            }}
          >
            {t('download')}
          </button>
        </div>
      </div>
      <div className="background-color bg-white mt-4">
        <h2 className="leading-7 font-bold h5 mr-4 mb-4" id="FAQ">
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
