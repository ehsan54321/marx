import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Star from '@components/stars/Star'
import { SortBySetaSeta, toPersian, usdInRials } from '@lib/helper'
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
  const [hover, setHover] = React.useState<boolean>(false)
  const { t } = useTranslation()
  return (
    <>
      <td>
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
      <td>
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
            className="d-flex flex-column mt-sm-0 mt-1 pb-sm-0 pb-1 ms-1"
            title={t('name-coin')}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <span
              className={classNames(
                'd-none d-sm-inline uiCoin_nameCoin text-start transition',
                hover && 'text-secondary'
              )}
            >
              {t('lang') ? name : all_name}
            </span>
            <span className="text-uppercase font-13 d-flex uiCoin_nameEN">
              {'(' + my_key + ')'}
            </span>
          </Link>
        </div>
      </td>
      <td>
        <p
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            'uiCoin_numbers mb-0'
          )}
          title={t('mane-rials')}
        >
          <span>
            {toPersian(
              SortBySetaSeta(usdInRials(usd, props.rialsOne)),
              t('lang')
            )}
          </span>
          <span
            className={classNames(
              'uiCoin_toman uiCoin_none',
              t('lang') ? 'ms-1' : 'me-1'
            )}
          >
            {t('toman')}
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
            {toPersian(dayAll.day_in, t('lang')) + '٪'}
            {(dayAll.color_day_in === 'red' && '-') ||
              (dayAll.color_day_in === 'green' && '+')}
          </span>
        </div>
      </td>
      <td>
        <div
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            'uiCoin_numbers'
          )}
          title={t('mane-usd')}
        >
          <span>{toPersian(SortBySetaSeta(usd), t('lang'))}</span>
          <span
            className={classNames(
              'uiCoin_toman uiCoin_none',
              t('lang') ? 'ms-1' : 'me-1'
            )}
          >
            {t('usd')}
          </span>
        </div>
      </td>
      <td className="border-0 justify-content-center d-none d-md-table-cell">
        <div
          className={classNames(
            !t('lang') && 'uiCoin_numEnMode',
            'uiCoin_numbers',
            `text-${dayAll.color_day7 === 'info' ? '' : dayAll.color_day7}`
          )}
          title={t('change-7d')}
        >
          <span>
            {toPersian(dayAll.day7, t('lang')) + '٪'}
            {(dayAll.color_day7 === 'red' && '-') ||
              (dayAll.color_day7 === 'green' && '+')}
          </span>
        </div>
      </td>
    </>
  )
}

export default React.memo(UiCoin)
