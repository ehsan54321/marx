import ChartComponents from './ChartComponents'
import { toPersian } from '@lib/helper'
import { useTranslation } from 'react-i18next'

const Chart = ({ props, nameCoin }) => {
  const { t } = useTranslation()
  return (
    //  flex-column flex-sm-row
    <div className="d-flex justify-content-between">
      <ChartComponents />
      <div style={{ width: 220 }} className="mt-5 pt-4 text-center">
        <h2 className="h6 m-0 mb-2">
          {t('price.change') + ' (' + nameCoin.toUpperCase() + ')'}
        </h2>
        <div className="list-group">
          <Item {...props} />
        </div>
      </div>
    </div>
  )
}

export default Chart

const Item = (props) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="d-flex justify-content-between coinPage_item list-group-item">
        <span className="text-secondary">{toPersian('24H', t('lang'))}</span>
        <span className={`text-${props.day.colorDayIn}`}>
          {toPersian(props.day.dayIn, t('lang')) + '٪'}
          {(props.day.colorDayIn === 'danger' && '-') ||
            (props.day.colorDayIn === 'success' && '+')}
        </span>
      </div>
      <div className="d-flex justify-content-between coinPage_item list-group-item">
        <span className="text-secondary">
          {toPersian('7 ', t('lang')) + t('day') + ' ' + t('lately')}
        </span>
        <span className={`text-${props.day.colorDay7}`}>
          {toPersian(props.day.day7, t('lang')) + '٪'}
          {(props.day.colorDay7 === 'danger' && '-') ||
            (props.day.colorDay7 === 'success' && '+')}
        </span>
      </div>
      <div className="d-flex justify-content-between coinPage_item list-group-item">
        <span className="text-secondary">
          {toPersian('30 ', t('lang')) + t('day')}
        </span>
        <span className={`text-${props.day.colorDay30}`}>
          {toPersian(props.day.day30, t('lang')) + '٪'}
          {(props.day.colorDay30 === 'danger' && '-') ||
            (props.day.colorDay30 === 'success' && '+')}
        </span>
      </div>
      <div className="d-flex justify-content-between coinPage_item list-group-item">
        <span className="text-secondary">
          {toPersian('90 ', t('lang')) + t('day')}
        </span>
        <span className={'text-' + props.day.colorDay90}>
          {toPersian(props.day.day90 + '٪', t('lang'))}
          {(props.day.colorDay90 === 'danger' && '-') ||
            (props.day.colorDay90 === 'success' && '+')}
        </span>
      </div>
      <div className="d-flex justify-content-between coinPage_item list-group-item">
        <span className="text-secondary">
          {toPersian('180 ', t('lang')) + t('day')}
        </span>
        <span className={`text-${props.day.colorDay180}`}>
          {toPersian(props.day.day180, t('lang')) + '٪'}
          {(props.day.colorDay180 === 'danger' && '-') ||
            (props.day.colorDay180 === 'success' && '+')}
        </span>
      </div>

      <div className="d-flex justify-content-between coinPage_item list-group-item">
        <span className="text-secondary">
          {toPersian('365 ', t('lang')) + t('day')}
        </span>
        <span className={`text-${props.day.colorDay365}`}>
          {toPersian(props.day.day365, t('lang')) + '٪'}{' '}
          {(props.day.colorDay365 === 'danger' && '-') ||
            (props.day.colorDay365 === 'success' && '+')}
        </span>
      </div>
      <div className="d-flex justify-content-between coinPage_item list-group-item">
        <span className="text-secondary">{t('all')}</span>
        <span className={`text-${props.day.colorDayAll}`}>
          {toPersian(props.day.dayAll, t('lang')) + '٪'}
          {(props.day.colorDayAll === 'danger' && '-') ||
            (props.day.colorDayAll === 'success' && '+')}
        </span>
      </div>
    </>
  )
}
