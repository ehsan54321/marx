import Image from 'next/image'
import Install from '@components/Install'
import Link from 'next/link'
import Meta from '@components/Meta'
import { AuthContext } from '@store/auth'
import { FaArrowLeft } from 'react-icons/fa'
import { numberToPersian } from '@lib/helper'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  const router = useRouter()
  const newCoin = [
    {
      key: 'cake',
      name: 'پنکیک سواپ',
      all_name: 'Pancake Swap',
      poster_path: 'cake',
    },
    {
      key: 'gala',
      name: 'گالا',
      all_name: 'Gala',
      poster_path: 'gala',
    },
    {
      key: 'atom',
      name: 'اتم',
      all_name: 'Cosmos',
      poster_path: 'atom',
    },
    {
      key: 'enj',
      name: 'انجین',
      all_name: 'Enjin coin',
      poster_path: 'enj',
    },
    {
      key: 'paxg',
      name: 'پکس گلد',
      all_name: 'Ethereum Service',
      poster_path: 'paxg',
    },
    {
      key: 'chz',
      name: 'چیلیز',
      all_name: 'Chiliz CHZ',
      poster_path: 'chz',
    },
  ]
  const topCoin = [
    {
      key: 'btc',
      name: 'بیت کوین',
      all_name: 'Bitcoin',
      poster_path: 'bitcoin',
    },
    {
      key: 'eth',
      name: 'اتریوم',
      all_name: 'Ethereum',
      poster_path: 'ethereum',
    },
    {
      key: 'usdt',
      name: 'تتر',
      all_name: 'Tether',
      poster_path: 'usdt',
    },
    {
      key: 'doge',
      name: 'دوج کوین',
      all_name: 'Dogecoin',
      poster_path: 'dogecoin',
    },
    {
      key: 'ltc',
      name: 'لایت کوین',
      all_name: 'Litecoin',
      poster_path: 'litecoin',
    },
    {
      key: 'bnb',
      name: 'بایننس',
      all_name: 'Binance',
      poster_path: 'bnb',
    },
    {
      key: 'ada',
      name: 'کاردانو',
      all_name: 'Cardano',
      poster_path: 'ada',
    },
    {
      key: 'usdc',
      name: 'یو اس دی',
      all_name: 'USD Coin',
      poster_path: 'usdc',
    },
    {
      key: 'dot',
      name: 'پولکادات',
      all_name: 'Polkadot',
      poster_path: 'dot',
    },
    {
      key: 'uni',
      name: 'یونی سواپ',
      all_name: 'Uniswap',
      poster_path: 'uni',
    },
    {
      key: 'xrp',
      name: 'ریپل',
      all_name: 'Xrp',
      poster_path: 'xrp',
    },
    {
      key: 'dai',
      name: 'دای',
      all_name: 'Dai',
      poster_path: 'dai',
    },
  ]
  return (
    <>
      <Meta
        title={t('page')}
        description="وب سایت مارکس کت یک سایت نمایش قیمت ارز های دجیتال است که بیش از ۴۴ ارز دجیتال دارد مانند بیت کوین اتریوم تتر دوج کوین و غیر ... صفحه اصلی"
        keywords="صفحه اصلی صرافی مارکس کت, ارز دجیتال, صرافی مارکس کت, مارکس کت"
      />
      <Install />
      <h2 className="h5 mb-6 leading-7 font-bold" dir="auto">
        {t('page')}
      </h2>
      <div
        className="flex justify-between max-lg:flex-col max-lg:items-center"
        dir={t('lang') ? 'rtl' : 'ltr'}
      >
        <div className="flex justify-center flex-col w-full max-lg:items-center">
          <h1 className="text-[47px]">{t('h1page')}</h1>
          <h2 className="text-[24px] text-neutral-600">
            {t('digital.market')}
          </h2>
          <div className="flex mt-3 max-sm:flex-col">
            <input
              type="email"
              id="email"
              dir={t('lang') ? 'rtl' : 'ltr'}
              className="bg-gray-50 text-base w-80 border border-solid focus:outline-0 border-gray-300 text-gray-900 rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500 filter-invert-dark"
              placeholder={t('your.email')}
            />
            <button
              className="mx-2 rounded-md text-sm cursor-pointer bg-gray-50 border border-solid border-gray-300 px-2 max-sm:py-1.5 max-sm:mt-1"
              onClick={() => router.push(isAuth ? '/account' : '/auth#login')}
            >
              {t('start')}
              <span className={t('lang') ? 'mr-1' : 'ml-1'}>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1 6.46A.75.75 0 109.04 5.4l-6.07 6.07a.75.75 0 000 1.06l6.07 6.07a.75.75 0 101.06-1.06l-4.79-4.79H20.5a.75.75 0 000-1.5H5.31l4.79-4.79z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="lg:w-3/4">
          <img
            src="/static/assets/img/bitcoin-iphone.svg"
            alt="bitcoin"
            className="filter-invert-dark animation-img max-sm:w-full"
            width={560}
          />
        </div>
      </div>

      <h2 className="h5 mb-6 leading-7 font-bold mt-10" dir="auto">
        {t('new.coin')}
      </h2>
      <div className="background-color bg-white mt-7 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 base:grid-cols-6 gap-2">
          {newCoin.map(({ key, name, all_name, poster_path }) => (
            <div
              key={key}
              className="w-full border border-solid border-gray-200 rounded p-5 h-44"
            >
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={`/static/assets/img/coins/${poster_path}.svg`}
                  alt={t('lang') ? name : all_name}
                  className="filter-invert-dark mt-[3px]"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col justify-center items-center mt-2">
                  <div className="flex flex-col sm:mt-0 mt-[.8px] max-sm:pb-1">
                    <span className="text-right transition duration-[.35s] ease-in-out leading-6">
                      {t('lang') ? name : all_name}
                    </span>
                  </div>
                  <span className="uppercase flex text-sm text-slate-500 leading-6 mt-1">
                    {'(' + key + ')'}
                  </span>
                </div>
                <Link
                  href={{
                    pathname: '/coins/[coin]',
                    query: { coin: key },
                  }}
                  className="flex items-center hover:text-[#1e4dd8] cursor-pointer mt-2 home_"
                >
                  <span className="ml-1 opacity-70">
                    {t('more.information')}
                  </span>
                  <span className="text-[#1e4dd8] text-base h-3.5 w-3.5 flex">
                    <FaArrowLeft />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="h5 mb-6 leading-7 font-bold mt-10" dir="auto">
        {t('lang')
          ? `پیش نمایش ${numberToPersian(topCoin.length, t('lang'))} کوین`
          : `Preview ${numberToPersian(topCoin.length, t('lang'))} coins`}
      </h2>
      <div className="background-color bg-white mt-7 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {topCoin.map(({ key, name, all_name, poster_path }) => (
            <div
              key={key}
              className="w-full border border-solid border-gray-200 rounded p-5"
            >
              <div className="flex">
                <div className="flex mt-[3px] ml-4">
                  <Image
                    src={`/static/assets/img/coins/${poster_path}.svg`}
                    alt={t('lang') ? name : all_name}
                    className="filter-invert-dark"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <div className="flex flex-col sm:mt-0 mt-[.8px] max-sm:pb-1">
                    <span className="text-right transition duration-[.35s] ease-in-out leading-6">
                      {t('lang') ? name : all_name}
                    </span>
                  </div>
                  <span className="uppercase flex text-sm text-slate-500 leading-6 mt-1">
                    {'(' + key + ')'}
                  </span>
                  <div>
                    <Link
                      href={{
                        pathname: '/coins/[coin]',
                        query: { coin: key },
                      }}
                      className="flex items-center hover:text-[#1e4dd8] cursor-pointer mt-1.5 home_"
                    >
                      <span className="ml-1 opacity-70">
                        {t('more.information')}
                      </span>
                      <span className="text-[#1e4dd8] text-base h-3.5 w-3.5 flex">
                        <FaArrowLeft />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Link href="/coins">
            <button className="inline-block py-1.5 text-base border border-solid bg-black text-white cursor-pointer rounded-md shadow-md hover:bg-[#424649] border-[#212529] hover:border-[#424649] outline-0 transition-btn w-full filter-invert-dark">
              {t('view.all.coins')}
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage
