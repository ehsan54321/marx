import classNames from 'classnames'
import Image from 'next/image'
import MapCoin from './MapCoin'
import Select from 'react-select'
import { BsSearch } from 'react-icons/bs'
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
const ControllerCoins = ({ dataServer }) => {
  const [dataCoin, setDataCoin] = useState<coinType[]>(dataServer.coins)
  const [sortId, setSortId] = useState<boolean>(false)
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
  const HandlerId = (e) => {
    setSortId(!sortId)
    if (e.value === 'small')
      setDataCoin((prevStat) => prevStat.sort((a, b) => a.id - b.id))
    else setDataCoin((prevStat) => prevStat.sort((a, b) => b.id - a.id))
  }
  const options = [
    { value: 'small', label: 'کم به زیاد' },
    { value: 'large', label: 'زیاد به کم' },
  ]
  return (
    <>
      <div className="mx-4 mb-4 d-flex justify-content-between uiCoin_select">
        <div className="d-flex mb-3 mb-sm-0 mt-2">
          <button type="submit" className="uiCoin_searchButton text-white">
            <BsSearch />
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
        <div>
          <p className="mb-1">مرتب بر اساس رتبه :</p>
          <Select
            onChange={HandlerId}
            defaultValue={[{ value: 'small', label: 'کم به زیاد' }]}
            options={options}
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
