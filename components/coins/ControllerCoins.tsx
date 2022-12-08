import classNames from 'classnames'
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
  const [data, setData] = useState<coinType[]>(dataServer.coins)
  const [sortId, setSortId] = useState<boolean>(false)
  const [dir, setDir] = useState<boolean>(true)
  const { t } = useTranslation()
  const searchHandler = (searchValue: string) => {
    setData(
      dataServer.coins.filter(
        (coin: coinType) =>
          SpasTo0(coin.key).includes(searchValue) ||
          SpasTo0(coin.name).includes(searchValue) ||
          SpasTo0(coin.all_name).toLocaleLowerCase().includes(searchValue) ||
          toPersian(coin.id.toString(), 'fa') === toPersian(searchValue, 'fa')
      )
    )
    sortById()
  }
  const sortById = () => {
    if (!sortId) setData((prevStat) => prevStat.sort((a, b) => a.id - b.id))
    else setData((prevStat) => prevStat.sort((a, b) => b.id - a.id))
  }
  const handlerId = (e: { value: string }) => {
    setSortId(!sortId)
    if (e.value === 'small')
      setData((prevStat) => prevStat.sort((a, b) => a.id - b.id))
    else setData((prevStat) => prevStat.sort((a, b) => b.id - a.id))
  }
  const options = [
    { value: 'small', label: t('little.to.much') },
    { value: 'large', label: t('more.to.less') },
  ]
  return (
    <>
      <div className="mx-4 mb-4 d-flex justify-content-between uiCoin_select flex-column flex-sm-row">
        <div className="d-flex mb-3 mb-sm-0 mt-2">
          <button type="submit" className="uiCoin_searchBtn text-white">
            <BsSearch />
          </button>
          <input
            type="search"
            className={classNames(
              'uiCoin_search border-start-0 w-100',
              dir && 'text-start'
            )}
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
          <p className="mb-1">{t('sort.by.id')}</p>
          <Select
            className="uiCoin_select"
            onChange={handlerId}
            defaultValue={[options[0]]}
            options={options}
          />
        </div>
      </div>

      <MapCoin
        rials={dataServer.rials}
        data={data}
        lanData={data.length <= 0}
      />
    </>
  )
}

export default ControllerCoins
