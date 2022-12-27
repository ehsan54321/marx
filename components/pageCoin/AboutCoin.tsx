import { formatCurrency, numberToPersian } from '@lib/helper'
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
    <div className="sm:flex">
      <div className="flex">
        <div className="me-3 mb-3 mb-sm-0" ref={tradingVolume}>
          <span className="text-slate-500">
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
          <span className="text-[13px] mt-1 mb-3 mb-sm-0">
            {numberToPersian(formatCurrency('756345'), t('lang'))}
          </span>
        </div>
        <div className="vr"></div>
        <div className="ms-3 me-3 flex flex-col">
          <span className="text-slate-500">{t('coin.display.size') + ':'}</span>
          <span className="text-[13px] mt-1">
            {numberToPersian(dayGrith, t('lang'))}
          </span>
        </div>
      </div>

      <div
        style={{ borderTop: '1px solid currentcolor' }}
        className="sm:hidden opacity-25"
      ></div>

      <div className="vr d-xm-none"></div>
      <div className="flex">
        <div
          className="ms-3 me-sm-3 flex flex-col me-3 mt-3 mt-sm-0"
          style={{ width }}
        >
          <span className="text-slate-500">{t('coin.total.market') + ':'}</span>
          <span className="text-[13px] mt-1">
            {numberToPersian('448.127M', t('lang'))}
          </span>
        </div>

        <div className="vr"></div>
        <div className="ms-3 mt-3 mt-sm-0">
          <span className="text-slate-500">{t('coin.date') + ':'}</span>
          <br />
          <div className="text-center">
            <span>{numberToPersian(aboutCoin.arz, t('lang'))}</span>
          </div>
          <div className="h-auto">
            <div
              className="bg-green-700 justify-start text-white py-px text-center rounded-lg"
              style={{ width: aboutCoin.now + '%' }}
            >
              <span>{numberToPersian(aboutCoin.now, t('lang')) + '٪'}</span>
            </div>
          </div>
          <div className="text-[13px] flex justify-between">
            <span className="text-slate-500 me-1">
              {t('coin.display.size') + ':'}
            </span>
            <span>{numberToPersian(aboutCoin.maxArz, t('lang'))}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutCoin
