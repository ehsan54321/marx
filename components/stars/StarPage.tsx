import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

const StarPage = (props) => {
  const { t } = useTranslation()
  return (
    <div className="star_an">
      <div className="flex flex-col justify-around rounded-xl w-44 h-44 p-[10px] bg-gray-100">
        <div className="flex">
          <div className="flex items-center">
            <Image
              src={`/static/images/coins/${props.poster_path}.svg`}
              alt={props.name}
              className="filter-invert-dark"
              width={33}
              height={33}
            />
          </div>
          <Link
            href={{
              pathname: '/coins/[coin]',
              query: { coin: props.nameEN },
            }}
            className="uiCoin_nameCoin mr-1"
          >
            <span
              title={t('coin')}
              className="flex mb-1 name transition duration-[.35s] ease-in-out"
            >
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
            className="inline-block px-4 py-1.5 bg-white text-red-600 text-base rounded-md border border-solid border-red-600 hover:bg-red-600 hover:text-white hover:shadow-md outline-0 transition-btn cursor-pointer"
            onClick={() => props.deleteStar(props.nameEN)}
          >
            <span>{t('delete')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StarPage
