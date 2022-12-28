import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

const StarPage = (props) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col justify-around rounded-xl w-44 h-44 p-[10px] bg-gray-100">
      <div className="flex">
        <div className="flex items-center">
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
          className="uiCoin_nameCoin mr-1"
        >
          <span title={t('name-coin')} className="flex mb-1 name my_transition">
            {props.name}
          </span>
          <span className="uppercase flex mb-0 text-[13px] mr-1 text-slate-500">
            {'(' + props.nameEN + ')'}
          </span>
        </Link>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => props.deleteStar(props.nameEN)}
        >
          <span>{t('delete')}</span>
        </button>
      </div>
    </div>
  )
}

export default StarPage
