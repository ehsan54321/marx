import classNames from 'classnames'
import Image from 'next/image'
import MapCoin from './MapCoin'
import { SpasTo0, toPersian } from '@lib/helper'
import { startTransition, useState } from 'react'
import { useTranslation } from 'react-i18next'

type coinType = {
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
type dataServerType = {
  coins: coinType[]
  rials: number
}
const ControllerCoins = ({ dataServer }: dataServerType | any) => {
  const [dataCoin, setDataCoin] = useState<coinType[]>(dataServer.coins)
  const [dir, setDir] = useState<boolean>(true)
  const { t } = useTranslation()
  const searchHandler = (searchValue: string) => {
    setDataCoin(
      dataServer.coins.filter(
        (coin: coinType) =>
          SpasTo0(coin.key).includes(searchValue) ||
          SpasTo0(coin.name).includes(searchValue) ||
          SpasTo0(coin.all_name).toLocaleLowerCase().includes(searchValue) ||
          toPersian(coin.id.toString(), 'fa') === toPersian(searchValue, 'fa')
      )
    )
  }
  return (
    <>
      <div className="mt-2 mx-4 mb-4">
        <div className="d-flex">
          <button type="submit" className="uiCoin_searchButton text-white">
            <i className="bi bi-search d-flex justify-content-center"></i>
          </button>
          <input
            type="search"
            className={classNames('uiCoin_search', dir && 'text-start')}
            maxLength={20}
            dir="auto"
            placeholder={
              t('lang')
                ? `جستجو بین ${toPersian(dataServer.coins.length, '1')} کوین`
                : `search ${dataServer.coins.length} coin`
            }
            onChange={(e) => {
              startTransition(() =>
                searchHandler(SpasTo0(e.target.value.toLocaleLowerCase()))
              )
              if (!e.target.value) setDir(true)
              else setDir(false)
              e.preventDefault()
            }}
          />
        </div>
      </div>

      {!(dataCoin.length <= 0) && (
        <MapCoin rials={dataServer.rials} data={dataCoin} />
      )}
      <div
        className={classNames(
          'm-5 p-5 text-center text-good',
          !(dataCoin.length <= 0) && 'd-none'
        )}
      >
        <Image
          src="/static/images/no-data.svg"
          alt="لوگو"
          className="mb-2 ms-3"
          width={100}
          height={100}
        />
        <p>{t('no.coin')}</p>
      </div>
    </>
  )
}

export default ControllerCoins