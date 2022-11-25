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
    <div className="ms-sm-auto">
      <table className="table table-sm table-responsive-sm hover">
        <thead>
          <tr className="tr">
            <th role="row" scope="col">
              <span className="uiCoin_th">#</span>
            </th>
            <th role="row" scope="col" className="text-start">
              <span>{t('name-coin')}</span>
            </th>
            <th role="row" scope="col">
              <span>{t('mane-rials')}</span>
            </th>
            <th role="row" scope="col">
              <span>{t('change-24h')}</span>
            </th>
            <th role="row" scope="col">
              <span>{t('mane-usd')}</span>
            </th>
            <th role="row" scope="col" className="d-md-block d-none">
              <span>{t('size-change-mane-24h')}</span>
            </th>
            <th role="row" scope="col" className="d-none d-sm-table-cell">
              <span>{t('change-7d')}</span>
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
  )
}

export default MapCoin
