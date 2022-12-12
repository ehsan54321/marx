import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

const StarPage = (props) => {
  const { t } = useTranslation()
  return (
    <div className="d-flex flex-column justify-content-around star_home">
      <div className="d-flex">
        <div className="d-flex align-items-center">
          <Image
            src={`/static/images/coins/${props.poster_path}.svg`}
            alt={props.name}
            width={26.5}
            height={26.5}
          />
        </div>
        <Link
          href={{
            pathname: '/coins/[coin]',
            query: { coin: props.nameEN },
          }}
          className="uiCoin_nameCoin ms-1"
        >
          <span title={t('name-coin')} className="d-flex mb-1 name transition">
            {props.name}
          </span>
          <span className="text-uppercase d-flex mb-0 font-13 ms-1 text-good">
            {'(' + props.nameEN + ')'}
          </span>
        </Link>
      </div>
      <div className="text-center">
        <button type="button" className="btn btn-outline-danger">
          <span>{t('delete')}</span>
        </button>
      </div>
    </div>
  )
}

export default StarPage
