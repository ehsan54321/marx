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
        <div className="ml-4 max-sm:mb-4" ref={tradingVolume}>
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
          <span className="text-[13px] mt-1 max-sm:mb-4">
            {numberToPersian(formatCurrency('756345'), t('lang'))}
          </span>
        </div>
        <div className="vr"></div>
        <div className="mr-4 ml-4 flex flex-col">
          <span className="text-slate-500">{t('coin.display.size') + ':'}</span>
          <span className="text-[13px] mt-1">
            {numberToPersian(dayGrith, t('lang'))}
          </span>
        </div>
      </div>

      <div className="sm:hidden opacity-25 border-t border-solid border-current"></div>

      <div className="vr max-sm:hidden"></div>
      <div className="flex">
        <div
          className="mr-4 sm:mr-3 flex flex-col ml-4 max-sm:mt-4"
          style={{ width }}
        >
          <span className="text-slate-500">{t('coin.total.market') + ':'}</span>
          <span className="text-[13px] mt-1">
            {numberToPersian('448.127M', t('lang'))}
          </span>
        </div>

        <div className="vr"></div>
        <div className="mr-4 max-sm:mt-4">
          <span className="text-slate-500">{t('coin.date') + ':'}</span>
          <br />
          <div className="text-center">
            <span>{numberToPersian(aboutCoin.arz, t('lang'))}</span>
          </div>
          <div className="h-auto">
            <div className="bg-slate-300 rounded-lg">
              <div
                className="text-white text-center rounded-lg bg-green-700"
                style={{ width: aboutCoin.now + '%' }}
              >
                <span>{numberToPersian(aboutCoin.now, t('lang')) + '٪'}</span>
              </div>
            </div>
          </div>
          <div className="text-[13px] flex justify-between">
            <span className="text-slate-500 mr-1">
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
