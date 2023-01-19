import Image from 'next/image'
import Link from 'next/link'
import SEO from '@components/Seo'
import { FaArrowLeft } from 'react-icons/fa'
import { numberToPersian } from '@lib/helper'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation()
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
      <SEO
        title={t('page')}
        keywords="صفحه اصلی صرافی مارکس کت, ارز دجیتال, صرافی مارکس کت, مارکس کت"
        description="وب سایت مارکس کت یک سایت نمایش قیمت ارز های دجیتال است که بیش از ۴۴ ارز دجیتال دارد مانند بیت کوین اتریوم تتر دوج کوین و غیر ...   صفحه اصلی"
        url=""
      />
      <h1 className="h5 mb-6 leading-7 font-bold h1Page">{t('page')}</h1>
      <section className="intro-h-600px">
        <section className="w-full intro-h-2-3 mb-[10px]">
          <section className="intro-2-3-col intro-h-100 relative h-md-300px">
            <section className="img-bg absolute top-0 bottom-0 right-0 left-0 bg-1 bg-cover intro-h-100"></section>
            <section className="intro-item-caption z-10 w-full h-full cursor-pointer absolute top-0 left-0">
              <p className="caption-title text-xl mr-4 absolute right-0">
                <span>
                  رشد ۷۴درصدی مانا در یک هفته گذشته در میان شایعات همکاری با اپل
                </span>
              </p>
              <span className="absolute right-4 p-0 bottom-9 text-white opacity-80">
                تاریخ ساخت : {numberToPersian('1401/11/10', t('lang'))}
              </span>
            </section>
          </section>
          <section className="intro-1-3-col intro-h-100">
            <section className="intro-1-3-item intro-h-50 relative h-md-300px">
              <section className="img-bg absolute top-0 bottom-0 right-0 left-0 bg-2 bg-cover intro-h-100"></section>
              <section className="intro-item-caption z-10 w-full h-full cursor-pointer absolute top-0 left-0">
                <p className="caption-title text-xl mr-4">
                  <span>
                    بایننس حدود ۶۰۰میلیون دلار توکن بی‌ان‌بی را سوزاند
                  </span>
                </p>
                <span className="absolute right-4 p-0 bottom-9 text-white opacity-80">
                  تاریخ ساخت : {numberToPersian('1401/11/10', t('lang'))}
                </span>
              </section>
            </section>
            <section className="intro-1-3-item intro-h-50 relative h-md-300px">
              <section className="img-bg absolute top-0 bottom-0 right-0 left-0 bg-3 bg-cover intro-h-100"></section>
              <section className="intro-item-caption z-10 w-full h-full cursor-pointer absolute top-0 left-0">
                <p className="caption-title text-xl mr-4">
                  <span>
                    افزایش ۵۰درصدی پرونده‌های حقوقی مرتبط با ارزهای دیجیتال
                    کمیسیون بورس و اوراق بهادار در سال ۲۰۲۲
                  </span>
                </p>
                <span className="absolute right-4 p-0 bottom-9 text-white opacity-80">
                  تاریخ ساخت : {numberToPersian('1401/11/10', t('lang'))}
                </span>
              </section>
            </section>
          </section>
          <section className="clear-fix"></section>
        </section>
        <section className="w-full intro-h-1-3">
          <section className="intro-1-3-col-item intro-h-100 relative h-md-300px">
            <section className="img-bg absolute top-0 bottom-0 right-0 left-0 bg-4 bg-cover intro-h-100"></section>
            <section className="intro-item-caption z-10 w-full h-full cursor-pointer absolute top-0 left-0">
              <p className="caption-title text-xl mr-4">
                <span>
                  مدیر اجرایی آی‌بی‌ام: ارزهای دیجیتال بانک مرکزی آینده پول
                  هستند
                </span>
              </p>
              <span className="absolute right-4 p-0 bottom-9 text-white opacity-80">
                تاریخ ساخت : {numberToPersian('1401/11/10', t('lang'))}
              </span>
            </section>
          </section>
          <section className="intro-1-3-col-item intro-h-100 relative h-md-300px">
            <section className="img-bg absolute top-0 bottom-0 right-0 left-0 bg-5 bg-cover intro-h-100"></section>
            <section className="intro-item-caption z-10 w-full h-full cursor-pointer absolute top-0 left-0">
              <p className="caption-title text-xl mr-4">
                <span>
                  دیجیتال کارنسی گروپ تا اطلاع ثانوی پرداخت سود سهام را متوقف
                  می‌کند
                </span>
              </p>
              <span className="absolute right-4 p-0 bottom-9 text-white opacity-80">
                تاریخ ساخت : {numberToPersian('1401/11/10', t('lang'))}
              </span>
            </section>
          </section>
          <section className="intro-1-3-col-item intro-h-100 relative h-md-300px">
            <section className="img-bg absolute top-0 bottom-0 right-0 left-0 bg-6 bg-cover intro-h-100"></section>
            <section className="intro-item-caption z-10 w-full h-full cursor-pointer absolute top-0 left-0">
              <p className="caption-title text-xl mr-4">
                <span>
                  رشد ۵درصدی توسعه‌دهندگان فعال بیت کوین نسبت به سال گذشته
                </span>
              </p>
              <span className="absolute right-4 p-0 bottom-9 text-white opacity-80">
                تاریخ ساخت : {numberToPersian('1401/11/10', t('lang'))}
              </span>
            </section>
          </section>
          <section className="clear-fix"></section>
        </section>
      </section>
      <div className="background-color bg-white mt-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {topCoin.map(({ key, name, all_name, poster_path }) => (
            <div
              className="w-full border border-solid border-gray-200 rounded p-5"
              key={key}
            >
              <div className="flex">
                <div className="flex mt-[3px] ml-4">
                  <Image
                    src={`/static/images/coins/${poster_path}.svg`}
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
                      className="flex items-center hover:text-[#1e4dd8] cursor-pointer mt-1.5"
                    >
                      <span className="ml-1 opacity-70">اطلاعات بیشتر</span>
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
            <button className="inline-block py-1.5 text-base border border-solid bg-black text-white cursor-pointer rounded-md shadow-md hover:bg-[#424649] border-[#212529] outline-0 transition-btn w-full">
              تماشای تمامی کوین ها
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage
