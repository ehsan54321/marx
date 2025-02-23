import classNames from 'classnames'
import MapCoin from './MapCoin'
import useTranslation from '@/hooks/translation'
import { BsSearch } from 'react-icons/bs'
import { numberToPersian, removeSpas } from '@/lib/helper'
import { startTransition, useRef, useState } from 'react'

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
  const pageItem: number = 15
  const t = useTranslation()
  const { pageSize } = dataServer
  const inputSearch = useRef(null)
  const [pageSh, setPageSh] = useState(1)
  const [page, setPage] = useState<number>(1)
  const [focus, setFocus] = useState<boolean>(false)
  const [pageSizeSh, setPageSizeSh] = useState(null)
  const [them, setThem] = useState<string>('filter-0')
  const [searchValue, setSearchValue] = useState<string>('')
  const [data, setData] = useState<coinType[]>(dataServer.coins)
  const [dataView, setDataView] = useState<coinType[]>(data.slice(0, pageItem))
  const arrPageSize = () => {
    const arr: number[] = [1]
    for (let i = 1; i < pageSize; i++) arr.push(arr.length + 1)
    return arr.sort((a, c) => c - a)
  }
  const arrPageSizeSh = () => {
    const arr: number[] = [1]
    for (let i = 1; i < pageSizeSh; i++) arr.push(arr.length + 1)
    return arr.sort((a, c) => c - a)
  }
  const PageSizeHandler = (pageName) => {
    setPage(pageName)
    scroll({ top: 0 })
    for (let i = 1; i <= pageSize; i++) {
      if (pageName === i) {
        //    PLC => PageLengthCoin
        const PLC = (i - 1) * pageItem
        setDataView(data.slice(PLC, PLC + pageItem))
      }
    }
  }
  const PageSizeHandlerSh = (pageName) => {
    setPageSh(pageName)
    scroll({ top: 0 })
    for (let i = 1; i <= pageSizeSh; i++) {
      if (pageName === i) {
        //    PLC => PageLengthCoin
        const PLC = (i - 1) * pageItem
        setDataView(data.slice(PLC, PLC + pageItem))
      }
    }
  }
  const searchHandler = (searchValue) => {
    setPageSh(1)
    const dataSearch = dataServer.coins.filter(
      (coin: coinType) =>
        removeSpas(coin.key).includes(searchValue) ||
        removeSpas(coin.name).includes(searchValue) ||
        removeSpas(coin.all_name).toLocaleLowerCase().includes(searchValue) ||
        numberToPersian(coin.id.toString(), true) ===
          numberToPersian(searchValue, true)
    )
    setData(dataSearch)
    if (dataSearch.length === dataServer.coins.length) {
      for (let i = 1; i <= pageSize; i++) {
        if (page === i) {
          //    PLC => PageLengthCoin
          const PLC = (i - 1) * pageItem
          setDataView(dataSearch.slice(PLC, PLC + pageItem))
        }
      }
    } else if (dataSearch.length >= pageItem) {
      const pageSZ = Math.ceil(dataSearch.length / pageItem)
      setPageSizeSh(pageSZ)
      //    PLC => PageLengthCoin
      const PLC = (1 - 1) * pageItem
      setDataView(dataSearch.slice(PLC, PLC + pageItem))
    } else setDataView(dataSearch)
  }
  return (
    <>
      <div className="flex mb-6 justify-between mx-6 max-sm:flex-col">
        <div className="flex mt-2 w-full sm:max-w-[285px]">
          <button type="button" className="uiCoin_searchBtn h5 text-white">
            <BsSearch />
          </button>
          <button
            type="button"
            className="h5 relative cursor-pointer flex"
            onClick={() => {
              inputSearch.current.value = ''
              inputSearch.current.focus()
              setSearchValue('')
              searchHandler('')
            }}
          >
            {searchValue && (
              <span className="absolute bg-black mr-1 text-white rounded-full w-6 top-[6.2px]">
                ×
              </span>
            )}
          </button>
          <button
            type="button"
            className="relative cursor-text flex h5"
            onClick={() => inputSearch.current.focus()}
          >
            {!searchValue && (
              <span
                className={classNames(
                  'absolute text-gray-400 text-[14.5px] w-32 top-[9px] transition-all',
                  focus ? 'mr-7' : 'mr-2'
                )}
              >
                {t('dir') === 'rtl'
                  ? `جستجو بین ${numberToPersian(
                      dataServer.coins.length,
                      1
                    )} کوین`
                  : `search ${dataServer.coins.length} coin`}
              </span>
            )}
          </button>
          <input
            type="text"
            className={classNames(
              'border-r-0 w-full uiCoin_search h-9 outline-0 pr-8 p-1 text-[14.5px] text-gray-400 focus:text-black',
              !searchValue ? 'text-right' : ''
            )}
            maxLength={35}
            dir="auto"
            ref={inputSearch}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => {
              startTransition(() => {
                searchHandler(removeSpas(e.target.value.toLocaleLowerCase()))
              })
              setSearchValue(e.target.value)
              e.preventDefault()
            }}
          />
        </div>
        <div className="flex items-center mb-1.5 relative sm:w-1/3 max-sm:mt-3">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow outline-0 dark:text-black"
            value={them}
            onChange={(e) => setThem(e.target.value)}
          >
            <option value="filter-0">{t('filter-none')}</option>
            <option value="filter-invert">{t('filter-invert')}</option>
            <option value="filter-grayscale">{t('filter-grayscale')}</option>
            <option value="filter-sepia">{t('filter-sepia')}</option>
            <option value="filter-hue-rotate">{t('filter-hue-rotate')}</option>
            <option value="filter-hue-rotate-lg">
              {t('filter-hue-rotate-lg')}
            </option>
            <option value="filter-hue-rotate-xl">
              {t('filter-hue-rotate-xl')}
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <MapCoin
        rials={dataServer.rials}
        data={dataView}
        them={them}
        lanData={data.length <= 0}
      />

      {!searchValue && data.length > pageItem && (
        <div className="flex justify-center mt-3">
          <ul className="flex justify-center gap-1" dir="ltr">
            {arrPageSize().map((item) => (
              <li
                className={classNames(
                  page === item
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-100',
                  'block h-8 w-8 rounded text-center leading-8 border border-solid cursor-pointer'
                )}
                key={item}
                onClick={() => PageSizeHandler(item)}
              >
                <span>{numberToPersian(item, t('dir') === 'rtl')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {searchValue && data.length > pageItem && (
        <div className="flex justify-center mt-3">
          <ul className="flex justify-center gap-1" dir="ltr">
            {arrPageSizeSh().map((item) => (
              <li
                className={classNames(
                  pageSh === item
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-100',
                  'block h-8 w-8 rounded text-center leading-8 border border-solid cursor-pointer'
                )}
                key={item}
                onClick={() => PageSizeHandlerSh(item)}
              >
                <span>{numberToPersian(item, t('dir') === 'rtl')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default ControllerCoins
