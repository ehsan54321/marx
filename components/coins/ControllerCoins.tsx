import classNames from 'classnames'
import MapCoin from './MapCoin'
import { BsSearch } from 'react-icons/bs'
import { numberToPersian, removeSpas } from '@lib/helper'
import { startTransition, useEffect, useState } from 'react'
import { TbX } from 'react-icons/tb'
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
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<coinType[]>(dataServer.coins)
  const [dataView, setDataView] = useState<coinType[]>(data.slice(0, 15))
  const [searchValue, setSearchValue] = useState<string>('')
  const { t } = useTranslation()
  useEffect(() => {
    if (page === 2) setDataView(data.slice(15, 30))
    else if (page === 3) setDataView(data.slice(30, 45))
    // else if (page === 4) setDataView(data.slice(45, 60))
    // else if (page === 5) setDataView(data.slice(60, 75))
    else setDataView(data.slice(0, 15))
  }, [page])
  const { pageSize } = dataServer
  const arrPageSize = () => {
    let arr: number[] = [1]
    for (let i = 1; i < pageSize; i++) {
      arr = [...arr, arr.length + 1]
    }
    return arr.sort((a, c) => c - a)
  }
  const searchHandler = (searchValue) => {
    const dataSearch = dataServer.coins.filter(
      (coin: coinType) =>
        removeSpas(coin.key).includes(searchValue) ||
        removeSpas(coin.name).includes(searchValue) ||
        removeSpas(coin.all_name).toLocaleLowerCase().includes(searchValue) ||
        numberToPersian(coin.id.toString(), 'fa') ===
          numberToPersian(searchValue, 'fa')
    )
    setData(dataSearch)
    setDataView(dataSearch)
  }
  return (
    <>
      <div className="mx-4 mb-4 d-flex mt-2 uiCoin_select">
        <button type="submit" className="uiCoin_searchBtn h5 text-white">
          <BsSearch />
        </button>
        <button
          type="submit"
          className="h5 uiCoin_btnX cursor-pointer bg-white d-flex position-relative"
          onClick={() => {
            setSearchValue('')
            searchHandler('')
          }}
        >
          {searchValue && (
            <span className="position-absolute bg-black ms-1">
              <TbX className="text-white" size={16} />
            </span>
          )}
        </button>
        <input
          type="text"
          className={classNames(
            'uiCoin_search border-start-0 w-100',
            !searchValue && 'text-start'
          )}
          maxLength={15}
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
      <MapCoin
        rials={dataServer.rials}
        data={dataView}
        lanData={data.length <= 0}
      />

      {data.length > 15  && (
        <nav>
          <ul className="pagination justify-content-center mt-2" dir="ltr">
            {arrPageSize().map((item) => (
              <li className="page-item" key={item}>
                <a
                  className={page === item ? 'page-link active' : 'page-link'}
                  onClick={() => setPage(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}

export default ControllerCoins
