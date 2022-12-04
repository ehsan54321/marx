import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  name: string
  nameEN: string
  poster_path: string
  deleteStar: Function
}
const StarPage = (props: Props) => {
  const [hover, setHover] = useState<boolean>(false)
  const { t } = useTranslation()
  return (
    <div className="d-flex flex-column justify-content-around star_home">
      <div>
        <Link
          href={{
            pathname: '/coins/[coin]',
            query: { coin: props.nameEN },
          }}
          className="d-flex"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="d-flex align-items-center">
            <Image
              src={`/static/images/coins/${props.poster_path}`}
              alt={props.name}
              width={26.5}
              height={26.5}
            />
          </div>
          <div className="ms-1">
            <div>
              <h3
                title={t('name-coin')}
                className={classNames(
                  'd-flex star_nameCoin',
                  hover && 'text-secondary transition'
                )}
              >
                {props.name}
              </h3>
            </div>
            <div>
              <h4 className="text-uppercase d-flex mb-0 font-13 ms-1 text-good">
                {'(' + props.nameEN + ')'}
              </h4>
            </div>
          </div>
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
