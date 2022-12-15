import classNames from 'classnames'
import MapCoin from './MapCoin'
import Select from 'react-select'
import { BsSearch, BsX } from 'react-icons/bs'
import { removeSpas, numberToPersian } from '@lib/helper'
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
  const [searchValue, setSearchValue] = useState<string>('')
  const { t } = useTranslation()
  const searchHandler = (searchValue) => {
    setData(
      dataServer.coins.filter(
        (coin: coinType) =>
          removeSpas(coin.key).includes(searchValue) ||
          removeSpas(coin.name).includes(searchValue) ||
          removeSpas(coin.all_name).toLocaleLowerCase().includes(searchValue) ||
          numberToPersian(coin.id.toString(), 'fa') ===
            numberToPersian(searchValue, 'fa')
      )
    )
    sortById()
  }
  const sortById = () => {
    if (!sortId)
      setData((prevStat) => prevStat.sort((a, b) => (a.id > b.id ? 1 : -1)))
    else setData((prevStat) => prevStat.sort((a, b) => (a.id < b.id ? 1 : -1)))
  }
  const handlerId = ({ value }) => {
    setSortId(!sortId)
    if (value === 'small')
      setData((prevStat) => prevStat.sort((a, b) => (a.id > b.id ? 1 : -1)))
    else setData((prevStat) => prevStat.sort((a, b) => (a.id < b.id ? 1 : -1)))
  }
  const options = [
    { value: 'small', label: t('little.to.much') },
    { value: 'large', label: t('more.to.less') },
  ]
  return (
    <>
      <div className="mx-4 mb-4 d-flex justify-content-between uiCoin_select flex-column flex-sm-row">
        <div className="d-flex mb-3 mb-sm-0 mt-2">
          <button type="submit" className="uiCoin_searchBtn h5 text-white">
            <BsSearch />
          </button>
          <button
            type="submit"
            className="h5 bg-white uiCoin_btnX"
            onClick={() => {
              setSearchValue('')
              searchHandler('')
            }}
          >
            {searchValue && <BsX className="position-absolute" />}
          </button>
          <input
            type="text"
            className={classNames(
              'uiCoin_search border-start-0 w-100',
              !searchValue && 'text-start'
            )}
            maxLength={20}
            dir="auto"
            value={searchValue}
            placeholder={
              t('lang')
                ? `جستجو بین ${numberToPersian(
                    dataServer.coins.length,
                    '1'
                  )} کوین`
                : `search ${dataServer.coins.length} coin`
            }
            onChange={(e) => {
              startTransition(() => {
                searchHandler(removeSpas(e.target.value.toLocaleLowerCase()))
              })
              setSearchValue(e.target.value)
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
