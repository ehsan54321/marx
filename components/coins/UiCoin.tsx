import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Star from '@components/stars/Star'
import { formatCurrency, numberToPersian } from '@lib/helper'
import { useTranslation } from 'react-i18next'

type Props = {
  my_key: string
  name: string
  poster_path: string
  id: number
  all_name: string
  dayAll: {
    value_24h: number
    day_in: number
    color_day_in: string
    day7: number
    color_day7: string
  }
  usd: number
  rialsOne: number
}
const UiCoin = (props: Props) => {
  const { my_key, name, poster_path, id, all_name, dayAll, usd }: Props = props
  const { t } = useTranslation()
  return (
    <tr className="tr">
      <td className="max-sm:hidden">
        <div>
          <Star name={my_key} faName={name} id={id} poster_path={poster_path} />
          <span className="text-slate-400 max-sm:hidden text-[12px] mr-[10px]">
            {numberToPersian(id, t('lang'))}
          </span>
        </div>
      </td>
      <td>
        <div className="flex">
          <div className="ml-2 sm:hidden mt-3">
            <Star
              name={my_key}
              faName={name}
              id={id}
              poster_path={poster_path}
            />
          </div>
          <div className="flex">
            <div className="flex items-center">
              <Image
                src={`/static/images/coins/${poster_path}.svg`}
                alt={t('lang') ? name : all_name}
                className="filter-invert-dark"
                width={26.5}
                height={26.5}
              />
            </div>
            <Link
              href={{
                pathname: '/coins/[coin]',
                query: { coin: my_key },
              }}
              className="flex flex-col sm:mt-0 mt-[.8px] max-sm:pb-1 mr-1 uiCoin_nameCoin"
              title={t('coin')}
            >
              <span className="hidden sm:inline text-right transition duration-[.35s] ease-in-out name leading-6">
                {t('lang') ? name : all_name}
              </span>
              <span className="uppercase flex uiCoin_nameEN text-slate-500 mr-1 leading-6 text-[12px] mt-1">
                {'(' + my_key + ')'}
              </span>
            </Link>
          </div>
        </div>
      </td>
      <td>
        <p
          className={classNames(
            'uiCoin_numbers mb-0 uiCoin_mane',
            !t('lang') ? 'uiCoin_numEnMode' : ''
          )}
          title={t('mane-rials')}
        >
          <span className="leading-8 font-bold">
            {numberToPersian(
              formatCurrency(~~(usd * props.rialsOne)),
              t('lang')
            )}
          </span>
          <span
            className={classNames('uiCoin_toman', t('lang') ? 'mr-1' : 'ml-1')}
          >
            {t('toman')}
          </span>
        </p>
        <p
          className={classNames(
            'uiCoin_numbers uiCoin_mane mb-0 sm:hidden',
            !t('lang') ? 'uiCoin_numEnMode' : ''
          )}
          title={t('mane-usd')}
        >
          <span className="leading-8 font-bold">
            {numberToPersian(formatCurrency(usd), t('lang'))}
          </span>
          <span
            className={classNames('uiCoin_toman', t('lang') ? 'mr-1' : 'ml-1')}
          >
            {t('usd')}
          </span>
        </p>
      </td>
      <td>
        <div
          className={classNames(
            'uiCoin_numbers',
            `text-${dayAll.color_day_in === 'info' ? '' : dayAll.color_day_in}`,
            !t('lang') ? 'uiCoin_numEnMode' : ''
          )}
          title={t('change-24h')}
        >
          <span className="leading-8 font-bold">
            {numberToPersian(dayAll.day_in, t('lang')) +
              '٪' +
              ((dayAll.color_day_in === 'red' && '-') ||
                (dayAll.color_day_in === 'green' && '+') ||
                '')}
          </span>
        </div>
      </td>
      <td className="max-sm:hidden">
        <p
          className={classNames(
            !t('lang') ? 'uiCoin_numEnMode' : '',
            'uiCoin_numbers mb-0'
          )}
          title={t('mane-usd')}
        >
          <span className="leading-8 font-bold">
            {numberToPersian(formatCurrency(usd), t('lang'))}
          </span>
          <span
            className={classNames('uiCoin_toman', t('lang') ? 'mr-1' : 'ml-1')}
          >
            {t('usd')}
          </span>
        </p>
      </td>
      <td className="border-0 justify-center hidden lg:table-cell">
        <div
          className={classNames(
            'uiCoin_numbers',
            `text-${dayAll.color_day7 === 'info' ? '' : dayAll.color_day7}`,
            !t('lang') ? 'uiCoin_numEnMode' : ''
          )}
          title={t('change-7d')}
        >
          <span className="leading-8 font-bold">
            {numberToPersian(dayAll.day7, t('lang')) +
              '٪' +
              ((dayAll.color_day7 === 'red' && '-') ||
                (dayAll.color_day7 === 'green' && '+') ||
                '')}
          </span>
        </div>
      </td>
    </tr>
  )
}

export default React.memo(UiCoin)
