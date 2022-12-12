import classNames from 'classnames'
import Image from 'next/image'
import UiCoin from './UiCoin'
import { useTranslation } from 'react-i18next'

type coin = {
  id: number
  key: string
  name: string
  poster_path: string
  all_name: string
  usd: number
  day: {
    value_24h: number
    day_in: number
    color_day_in: string
    day7: number
    color_day7: string
  }
}
const MapCoin = (props: { data: coin[]; rials: number; lanData: boolean }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="table-responsive">
        <table
          className={classNames(
            'table table-sm hover',
            props.lanData && 'd-none'
          )}
        >
          <thead>
            <tr className="tr h-auto">
              <th className="text-center uiCoin_none uiCoin_idTh">#</th>
              <th className="text-start uiCoin_coin">{t('name-coin')}</th>
              <th className="uiCoin_price">
                <span className="uiCoin_none">{t('mane-rials')}</span>
                <span className="d-sm-none">{t('price')}</span>
              </th>
              <th className="uiCoin_change">{t('change-24h')}</th>
              <th className="uiCoin_none uiCoin_usd">{t('mane-usd')}</th>
              <th className="d-none d-lg-table-cell uiCoin_change7">
                {t('change-7d')}
              </th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((coin) => (
              <UiCoin
                key={coin.id}
                my_key={coin.key}
                {...coin}
                dayAll={coin.day}
                rialsOne={props.rials}
              />
            ))}
          </tbody>
        </table>
      </div>
      {props.lanData && (
        <div className="m-5 p-5 text-center text-good">
          <Image
            src="/static/images/no-data.svg"
            className="mb-2 ms-3"
            alt="لوگو"
            width={100}
            height={100}
          />
          <p>{t('no.coin')}</p>
        </div>
      )}
    </>
  )
}

export default MapCoin
