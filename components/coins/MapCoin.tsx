import React from 'react'
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
type Props = {
  data: coin[]
  rials: number
}
const MapCoin = (props: Props) => {
  const { t } = useTranslation()
  return (
    <div className="table-responsive">
      <table className="table table-sm hover">
        <thead>
          <tr className="tr">
            <th>
              <span className="uiCoin_th">#</span>
            </th>
            <th className="text-start">{t('name-coin')}</th>
            <th>{t('mane-rials')}</th>
            <th>{t('change-24h')}</th>
            <th>{t('mane-usd')}</th>
            <th className="d-md-block d-none">{t('size-change-mane-24h')}</th>
            <th className="d-none d-sm-table-cell">{t('change-7d')}</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((coin) => (
            <tr className="tr" key={coin.id}>
              <UiCoin
                my_key={coin.key}
                {...coin}
                dayAll={coin.day}
                rialsOne={props.rials}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MapCoin
