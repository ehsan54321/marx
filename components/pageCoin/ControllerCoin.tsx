import AboutCoin from '@components/pageCoin/AboutCoin'
import Chart from '@components/pageCoin/chart'
import classNames from 'classnames'
import Image from 'next/image'
import Star from '@components/stars/Star'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { SortBySetaSeta, toPersian, usdInRials } from '@lib/helper'
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
      <div className="row w-100 ms-0">
        <div className="d-flex mb-3 justify-content-between col">
          <div className="d-flex">
            <div className="ms-2 d-flex">
              <div className="d-flex align-items-center coinPage_imgCoin">
                <Image
                  src={`/static/images/coins/${props.coin.poster_path}.svg`}
                  alt={props.coin.name}
                  width={40}
                  height={40}
                />
              </div>
              <div className="d-flex pt-3">
                <div style={{ lineHeight: 0 }}>
                  <h1 className="ms-1 h5" title={t('name-coin')}>
                    {t('lang') ? props.coin.name : props.coin.all_name}
                  </h1>
                  <br />
                  <h2 className="d-flex mb-0 coinPage_nameEN">
                    <span className="text-uppercase font-15">
                      {'(' + nameCoin + ')'}
                    </span>
                    <i className="text-white">_</i>
                    <span className="text-capitalize font-15">
                      {t('lang') ? props.coin.all_name : props.coin.name}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ms-2 font-17 coinPage_star">
              <Star
                name={nameCoin}
                faName={props.coin.name}
                id={props.coin.id}
                poster_path={props.coin.poster_path}
              />
            </div>
          </div>
          <div className="d-flex align-items-center ms-1">
            <span
              style={{
                borderRadius: 10,
                color: '#014a8f',
                background: '#f2f6f9',
                padding: '6px 8.5px',
              }}
            >
              {'#' + toPersian(props.coin.id, t('lang'))}
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
              `bg-${props.coin.day.colorDayIn}`,
              'coinPage_dar text-white justify-content-center mt-3 d-flex h6'
            )}
          >
            <div>
              {props.coin.day.colorDayIn === 'danger' ? (
                <BsFillCaretDownFill />
              ) : (
                <BsFillCaretUpFill />
              )}
            </div>
            <span>
              {toPersian(props.coin.day.dayIn, t('lang')) +
                '٪' +
                (props.coin.day.colorDayIn === 'danger' ? '-' : '+')}
            </span>
          </div>
        </div>
        <div></div>
        <div
          className="mt-3 mb-3 col"
          style={{ paddingLeft: 'calc(var(--bs-gutter-x) * .0)' }}
        >
          <div className="d-flex flex-column" title={t('mane-usd')}>
            <span className="text-good">{t('mane-usd')}:</span>
            <span className="font-18 mt-1">
              {toPersian(SortBySetaSeta(props.coin.usd), t('lang'))}
              <span className="uiCoin_toman ms-1">{t('usd')}</span>
            </span>
          </div>
        </div>
        <div className="d-flex mt-3 align-items-center mb-3 col">
          <div className="d-flex flex-column" title={t('mane-rials')}>
            <span className="text-good">{t('mane-rials')}:</span>
            <span className="font-18 mt-1">
              {toPersian(
                SortBySetaSeta(usdInRials(props.coin.usd, props.rials)),
                t('lang')
              )}
              <span className="uiCoin_toman ms-1">{t('toman')}</span>
            </span>
          </div>
        </div>
      </div>
      <Chart props={props.coin} nameCoin={nameCoin} />
    </>
  )
}

export default ControllerPageCoin
