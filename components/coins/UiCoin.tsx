import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Star from '@components/stars/Star'
import { SortBySetaSeta, toPersian, usdInRials } from '@lib/helper'
import { useTranslation } from 'react-i18next'

type UiCoinProps = {
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
const UiCoin: React.FC<UiCoinProps> = (props) => {
  const {
    my_key,
    name,
    poster_path,
    id,
    all_name,
    dayAll,
    usd,
    rialsOne,
  }: UiCoinProps = props
  const [hover, setHover] = useState<boolean>(false)
  const { t } = useTranslation()
  return (
    <tr className="tr">
      <td role="cell" className="uiCoin_width65">
        <div className="d-flex justify-content-start">
          <div className="ms-3 d-flex align-items-center uiCoin_star">
            <Star
              name={my_key}
              faName={name}
              id={id}
              poster_path={poster_path}
            />
            <span className="text-good d-none d-sm-inline-block uiCoin_id">
              {toPersian(id, t('lang'))}
            </span>
          </div>
        </div>
      </td>
      <td role="cell">
        <div className="d-flex">
          <Link
            href={{
              pathname: '/coins/[coin]',
              query: { coin: my_key },
            }}
            className="d-flex mt-sm-0 mt-1 pb-sm-0 pb-1"
            title={t('name-coin')}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className="d-flex me-1 align-items-center">
              <Image
                src={`/static/images/coins/${poster_path}`}
                alt={t('lang') ? name : all_name}
                width={26.5}
                height={26.5}
              />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <span
                className={classNames(
                  'd-flex d-none d-sm-flex uiCoin_nameCoin transition',
                  hover && 'text-secondary'
                )}
              >
                {t('lang') ? name : all_name}
              </span>
              <span className="text-uppercase font-13 d-flex mb-0 uiCoin_nameEN">
                {'(' + my_key + ')'}
              </span>
            </div>
          </Link>
        </div>
      </td>
      <td role="cell">
        <div
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            'uiCoin_numbers'
          )}
          title={t('mane-rials')}
        >
          <span>
            {toPersian(SortBySetaSeta(usdInRials(usd, rialsOne)), t('lang'))}
          </span>
          <span className="d-none d-sm-inline-block uiCoin_toman">
            {t('toman')}
          </span>
        </div>
      </td>
      <td role="cell">
        <div
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            `uiCoin_numbers text-${dayAll.color_day_in}`
          )}
          title={t('change-24h')}
        >
          <i
            className={`bi me-1 d-none d-sm-inline-block bi-caret-${
              dayAll.color_day_in === 'red' ? 'down' : ''
            }${dayAll.color_day_in === 'green' ? 'up' : ''}-fill`}
          ></i>
          <span>
            {toPersian(dayAll.day_in, t('lang')) +
              '٪' +
              (dayAll.color_day_in === 'red' ? '-' : '+')}
          </span>
        </div>
      </td>

      <td role="cell">
        <div
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            'uiCoin_numbers'
          )}
          title={t('mane-usd')}
        >
          <span>{'$' + toPersian(SortBySetaSeta(usd), t('lang'))}</span>
        </div>
      </td>
      <td
        role="cell"
        className="d-md-table-cell border-0 justify-content-center d-none"
      >
        <div
          className={classNames(
            'justify-content-center uiCoin_numbers',
            !t('lang') && 'uiCoin_numEnMode'
          )}
          title={t('size-change-mane-24h')}
        >
          <span>{toPersian(SortBySetaSeta(dayAll.value_24h), t('lang'))}</span>
        </div>
      </td>
      <td
        role="cell"
        className="border-0 justify-content-center d-none d-sm-table-cell"
      >
        <div
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            `uiCoin_numbers text-${dayAll.color_day7}`
          )}
          title={t('change-7d')}
        >
          <i
            className={`bi me-1 bi-caret-${
              dayAll.color_day7 === 'red' ? 'down' : ''
            }${dayAll.color_day7 === 'green' ? 'up' : ''}-fill`}
          ></i>
          <span>
            {toPersian(dayAll.day7, t('lang')) +
              '٪' +
              (dayAll.color_day7 === 'red' ? '-' : '+')}
          </span>
        </div>
      </td>
    </tr>
  )
}

export default React.memo(UiCoin)
