import { SortBySetaSeta, toPersian } from '@lib/helper'
import { useTranslation } from 'react-i18next'

const AboutCoin = ({ aboutCoin, dayGrith }) => {
  const { t } = useTranslation()
  return (
    <div className="d-sm-flex">
      <div className="d-flex">
        <div className="me-3">
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
          <span className="font-13 mt-1">
            {toPersian(SortBySetaSeta('756345'), t('lang'))}
          </span>
        </div>
        <div className="vr"></div>
        <div className="ms-3 me-3 d-flex flex-column">
          <span className="text-good">{t('coin.display.size') + ':'}</span>
          <span className="font-13 mt-1">{toPersian(dayGrith, t('lang'))}</span>
        </div>
      </div>
      <hr className="mb-sm-0 mb-2 mt-sm-0 mt-2 d-sm-none" />
      <div className="vr d-none d-sm-flex"></div>
      <div className="d-flex">
        <div className="ms-3 me-sm-3 d-flex flex-column me-3">
          <span className="text-good">{t('coin.total.market') + ':'}</span>
          <span className="font-13 mt-1">
            {toPersian('448.127M', t('lang'))}
          </span>
        </div>

        <div className="vr"></div>
        <div className="ms-3">
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
            <span className="text-good">{t('coin.display.size') + ':'}</span>
            <span>{toPersian(aboutCoin.maxArz, t('lang'))}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutCoin
