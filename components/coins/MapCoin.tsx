import Image from 'next/image'
import React from 'react'
import UiCoin from './UiCoin'
import { useEffect, useRef } from 'react'
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
  const idTh = useRef(null)
  const coinTh = useRef(null)
  const rialsTh = useRef(null)
  const change24Th = useRef(null)
  const usdTh = useRef(null)
  const change7dTh = useRef(null)
  const ArrUseRef = [idTh, coinTh, rialsTh, change24Th, usdTh, change7dTh]
  useEffect(() => {
    for (let i = 0; i < ArrUseRef.length; i++) {
      ArrUseRef[i].current.style.width =
        ArrUseRef[i].current.getBoundingClientRect().width + 'px'
    }
  }, [])
  return (
    <>
      <div className="table-responsive">
        <table className="table table-sm hover">
          <thead>
            <tr className="tr">
              <th className="text-center" ref={idTh}>
                <span className="uiCoin_th">#</span>
              </th>
              <th ref={coinTh} className="text-start uiCoin_coin">
                {t('name-coin')}
              </th>
              <th ref={rialsTh}>{t('mane-rials')}</th>
              <th ref={change24Th}>{t('change-24h')}</th>
              <th ref={usdTh}>{t('mane-usd')}</th>
              <th className="d-md-block d-none">{t('size-change-mane-24h')}</th>
              <th ref={change7dTh} className="d-none d-sm-table-cell">
                {t('change-7d')}
              </th>
            </tr>
          </thead>
          <tbody className={props.lanData ? 'd-none' : ''}>
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
