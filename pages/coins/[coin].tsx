import AdsComponents from '@components/Ads'
import classNames from 'classnames'
import ControllerPageCoin from '@components/pageCoin/ControllerCoin'
import http from '@services/httpServices'
import Link from 'next/link'
import SEO from '@components/Seo'
import Share from '@components/pageCoin/Share'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const nameCoin: string | string[] = ctx.params.coin
  const props = (await http.get(`api/coins/${nameCoin}`)).data

  return {
    notFound: !!(props === 'NotFound'),
    props: { props, nameCoin },
  }
}

const Coin = ({ props, nameCoin }) => {
  const { t } = useTranslation()
  return (
    <>
      <SEO
        title={t('lang') ? props.coin.name : props.coin.all_name}
        keywords={`${props.coin.name}, وب سایت نمایش قیمت ارز های دجیتال, دجیتال بیت کوین , بیت کوین ,ارز دجیتال`}
        description={props.coin.aboutCoin.body}
      />
      <AdsComponents />
      <nav className="mt-4 mb-4 nav_page">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">{t('list-coins')}</Link>
          </li>
          <li className="breadcrumb-item active">
            {t('lang') ? props.coin.name : props.coin.all_name}
          </li>
        </ul>
      </nav>

      <div className="background-color bg-white">
        <ControllerPageCoin {...props} nameCoin={nameCoin} />
      </div>
      <div className="background-color bg-white mt-3">
        <Share nameCoin={nameCoin} name={props.coin.name} />
      </div>
      <AboutCoin {...props} />
    </>
  )
}

export default Coin

const AboutCoin = (props) => {
  const { t } = useTranslation()
  const [showItem, setShowItem] = useState<null | number>(null)
  const oneAccordion = useRef(null)
  const towAccordion = useRef(null)
  const div1 = useRef(null)
  const div2 = useRef(null)
  useEffect(() => {
    const oneAccordionY = oneAccordion.current.clientHeight
    const towAccordionY = towAccordion.current.clientHeight
    if (showItem === 1) {
      div1.current.style.height = `calc(${oneAccordionY}px + 2rem)`
      div2.current.style.height = 0
    } else if (showItem === 2) {
      div2.current.style.height = `calc(${towAccordionY}px + 2rem)`
      div1.current.style.height = 0
    } else {
      div1.current.style.height = 0
      div2.current.style.height = 0
    }
  }, [showItem])
  return (
    <div className="background-color bg-white mt-3">
      <h2 className="h1_page h5 ms-3 mb-3">
        {t('lang') ? 'معرفی کوین' : 'Introducing Coin'}
      </h2>
      <div className="accordion accordion-flush">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={classNames(
                'accordion-button',
                !(showItem === 1) && 'collapsed'
              )}
              type="button"
              onClick={() => {
                if (showItem === 1) setShowItem(null)
                else setShowItem(1)
              }}
            >
              به زبان فارسی
            </button>
          </h2>
          <div className="accordion-collapse accordion_transition" ref={div1}>
            <div className="accordion-body">
              <p className="accordion_list" ref={oneAccordion} dir="auto">
                {props.coin.aboutCoin.body}
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              type="button"
              className={classNames(
                'accordion-button',
                !(showItem === 2) && 'collapsed'
              )}
              onClick={() => {
                if (showItem === 2) setShowItem(null)
                else setShowItem(2)
              }}
            >
              to Lang English
            </button>
          </h2>
          <div className="accordion-collapse accordion_transition" ref={div2}>
            <div className="accordion-body">
              <p className="accordion_list" ref={towAccordion} dir="auto">
                {props.coin.aboutCoin.ENbody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
