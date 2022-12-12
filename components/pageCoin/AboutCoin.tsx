import { SortBySetaSeta, toPersian } from '@lib/helper'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const AboutCoin = ({ aboutCoin, dayGrith }) => {
  const { t } = useTranslation()
  const [width, setWidth] = useState<string>('auto')
  const tradingVolume = useRef(null)
  useEffect(() => {
    if (document.body.clientWidth <= 576)
      setWidth(tradingVolume.current.getBoundingClientRect().width - 16 + 'px')
  }, [])
  return (
    <div className="d-sm-flex">
      <div className="d-flex">
        <div className="me-3 mb-3 mb-sm-0" ref={tradingVolume}>
          <span className="text-good">
            {t('lang') ? (
              <>
                {'ارزش معاملات ۲۴'}
                <br />
                {'ساعته (USD):'}
              </>
            ) : (
              <>
                {'Trading volume (24h)'}
                <br />
                {'Hourly (USD):'}
              </>
            )}
          </span>
          <br />
          <span className="font-13 mt-1 mb-3 mb-sm-0">
            {toPersian(SortBySetaSeta('756345'), t('lang'))}
          </span>
        </div>
        <div className="vr"></div>
        <div className="ms-3 me-3 d-flex flex-column">
          <span className="text-good">{t('coin.display.size') + ':'}</span>
          <span className="font-13 mt-1">{toPersian(dayGrith, t('lang'))}</span>
        </div>
      </div>

      <div
        style={{ borderTop: '1px solid currentcolor', opacity: 0.25 }}
        className="d-sm-none"
      ></div>

      <div className="vr d-none d-sm-flex"></div>
      <div className="d-flex">
        <div
          className="ms-3 me-sm-3 d-flex flex-column me-3 mt-3 mt-sm-0"
          style={{ width }}
        >
          <span className="text-good">{t('coin.total.market') + ':'}</span>
          <span className="font-13 mt-1">
            {toPersian('448.127M', t('lang'))}
          </span>
        </div>

        <div className="vr"></div>
        <div className="ms-3 mt-3 mt-sm-0">
          <span className="text-good">{t('coin.date') + ':'}</span>
          <br />
          <div className="text-center">
            <span>{toPersian(aboutCoin.arz, t('lang'))}</span>
          </div>
          <div className="progress h-auto">
            <div
              className="progress-bar bg-success progress-bar-striped justify-content-start"
              style={{ width: aboutCoin.now + '%' }}
            >
              <span style={{ marginTop: '.15rem' }}>
                {toPersian(aboutCoin.now, t('lang')) + '٪'}
              </span>
            </div>
          </div>
          <div className="font-13 d-flex justify-content-between">
            <span className="text-good me-1">
              {t('coin.display.size') + ':'}
            </span>
            <span>{toPersian(aboutCoin.maxArz, t('lang'))}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutCoin
