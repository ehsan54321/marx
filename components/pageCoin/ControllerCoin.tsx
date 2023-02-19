import AboutCoin from '@components/pageCoin/AboutCoin'
import Chart from '@components/pageCoin/chart'
import classNames from 'classnames'
import Image from 'next/image'
import Star from '@components/stars/Star'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { formatCurrency, numberToPersian } from '@lib/helper'
import { useTranslation } from 'react-i18next'

type Props = {
  coin: any
  rials: number
  nameCoin: string
}
const ControllerPageCoin = (props: Props) => {
  const { nameCoin } = props
  const { t } = useTranslation()
  return (
    <>
      <div className="row w-full mr-0">
        <div className="flex mb-4 justify-between">
          <div className="flex">
            <div className="mr-2 flex">
              <div className="flex items-center coinPage_imgCoin">
                <Image
                  src={`/static/assets/img/coins/${props.coin.poster_path}.svg`}
                  alt={props.coin.name}
                  className="filter-invert-dark"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex pt-4">
                <div className="leading-[0]">
                  <h1 className="mr-1 h5" title={t('coin')}>
                    {t('lang') ? props.coin.name : props.coin.all_name}
                  </h1>
                  <br />
                  <h2 className="flex mb-0 coinPage_nameEN text-slate-500">
                    <span className="uppercase text-[15px]">
                      {'(' + nameCoin + ')'}
                    </span>
                    <i className="text-white">_</i>
                    <span className="text-capitalize text-[15px]">
                      {t('lang') ? props.coin.all_name : props.coin.name}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex items-center mr-2 text-[17px] coinPage_star">
              <Star
                name={nameCoin}
                faName={props.coin.name}
                id={props.coin.id}
                poster_path={props.coin.poster_path}
              />
            </div>
          </div>
          <div className="flex items-center mr-1">
            <span className="rounded-[10px] text-blue-900 py-[6px] px-[8.5px] bg-[#f2f6f9]">
              {'#' + numberToPersian(props.coin.id, t('lang'))}
            </span>
          </div>
        </div>
        <AboutCoin
          dayGrith={props.coin.dayGrith}
          aboutCoin={props.coin.aboutCoin}
        />
        <div className="col">
          <div
            title={t('change-24h')}
            className={classNames(
              'rounded-full text-white justify-center mt-4 flex h6 py-[20px] filter-invert-dark',
              (props.coin.day.colorDayIn === 'red' && 'bg-red-500') ||
                (props.coin.day.colorDayIn === 'green' && 'bg-green-700') ||
                'bg-blue-500'
            )}
          >
            <div>
              {props.coin.day.colorDayIn === 'red' ? (
                <BsFillCaretDownFill />
              ) : (
                <BsFillCaretUpFill />
              )}
            </div>
            <span className="font-bold">
              {numberToPersian(props.coin.day.dayIn, t('lang')) +
                '٪' +
                (props.coin.day.colorDayIn === 'red' ? '-' : '+')}
            </span>
          </div>
        </div>
        <div />
        <div className="mt-4 mb-4 col pl-0">
          <div className="flex flex-col" title={t('mane-usd')}>
            <span className="text-slate-500">{t('mane-usd') + ' :'}</span>
            <span className="text-[18px] mt-1">
              {numberToPersian(formatCurrency(props.coin.usd), t('lang'))}
              <span
                className={classNames(
                  'uiCoin_toman',
                  t('lang') ? 'mr-1' : 'mr-1'
                )}
              >
                {t('usd')}
              </span>
            </span>
          </div>
        </div>
        <div className="flex mt-4 items-center mb-4 col">
          <div className="flex flex-col" title={t('mane-rials')}>
            <span className="text-slate-500">{t('mane-rials') + ' :'}</span>
            <span className="text-[18px] mt-1">
              {numberToPersian(
                formatCurrency(~~(props.coin.usd * props.rials)),
                t('lang')
              )}
              <span
                className={classNames(
                  'uiCoin_toman',
                  t('lang') ? 'mr-1' : 'mr-1'
                )}
              >
                {t('toman')}
              </span>
            </span>
          </div>
        </div>
      </div>
      <Chart props={props.coin} nameCoin={nameCoin} chart={props.coin.chart} />
    </>
  )
}

export default ControllerPageCoin
