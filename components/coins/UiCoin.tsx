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
      <td className="d-xm-none">
        <div>
          <Star name={my_key} faName={name} id={id} poster_path={poster_path} />
          <span className="text-good d-xm-none uiCoin_id">
            {numberToPersian(id, t('lang'))}
          </span>
        </div>
      </td>
      <td>
        <div className="d-flex">
          <div className="me-2 d-sm-none uiCoin_star">
            <Star
              name={my_key}
              faName={name}
              id={id}
              poster_path={poster_path}
            />
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center">
              <Image
                src={`/static/images/coins/${poster_path}.svg`}
                alt={t('lang') ? name : all_name}
                width={26.5}
                height={26.5}
              />
            </div>
            <Link
              href={{
                pathname: '/coins/[coin]',
                query: { coin: my_key },
              }}
              className="d-flex flex-column mt-sm-0 mt-1 pb-sm-0 pb-1 ms-1 uiCoin_nameCoin"
              title={t('name-coin')}
            >
              <span className="d-none d-sm-inline text-start transition name">
                {t('lang') ? name : all_name}
              </span>
              <span className="text-uppercase d-flex uiCoin_nameEN">
                {'(' + my_key + ')'}
              </span>
            </Link>
          </div>
        </div>
      </td>
      <td>
        <p
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            'uiCoin_numbers mb-0 uiCoin_mane'
          )}
          title={t('mane-rials')}
        >
          <span>
            {numberToPersian(
              formatCurrency(~~(usd * props.rialsOne)),
              t('lang')
            )}
          </span>
          <span
            className={classNames('uiCoin_toman', t('lang') ? 'ms-1' : 'me-1')}
          >
            {t('toman')}
          </span>
        </p>
        <p
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            'uiCoin_numbers uiCoin_mane mb-0 d-sm-none uiCoin_numbersSm'
          )}
          title={t('mane-usd')}
        >
          <span>{numberToPersian(formatCurrency(usd), t('lang'))}</span>
          <span
            className={classNames('uiCoin_toman', t('lang') ? 'ms-1' : 'me-1')}
          >
            {t('usd')}
          </span>
        </p>
      </td>
      <td>
        <div
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            'uiCoin_numbers',
            `text-${dayAll.color_day_in === 'info' ? '' : dayAll.color_day_in}`
          )}
          title={t('change-24h')}
        >
          <span>
            {numberToPersian(dayAll.day_in, t('lang')) + '٪'}
            {(dayAll.color_day_in === 'red' && '-') ||
              (dayAll.color_day_in === 'green' && '+')}
          </span>
        </div>
      </td>
      <td className="d-xm-none">
        <p
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            'uiCoin_numbers mb-0'
          )}
          title={t('mane-usd')}
        >
          <span>{numberToPersian(formatCurrency(usd), t('lang'))}</span>
          <span
            className={classNames('uiCoin_toman', t('lang') ? 'ms-1' : 'me-1')}
          >
            {t('usd')}
          </span>
        </p>
      </td>
      <td className="border-0 justify-content-center d-none d-lg-table-cell">
        <div
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            'uiCoin_numbers',
            `text-${dayAll.color_day7 === 'info' ? '' : dayAll.color_day7}`
          )}
          title={t('change-7d')}
        >
          <span>
            {numberToPersian(dayAll.day7, t('lang')) + '٪'}
            {(dayAll.color_day7 === 'red' && '-') ||
              (dayAll.color_day7 === 'green' && '+')}
          </span>
        </div>
      </td>
    </tr>
  )
}

export default React.memo(UiCoin)
