import ChartComponents from './ChartComponents'
import useTranslation from '@/hooks/translation'
import { numberToPersian } from '@/lib/helper'

const Chart = ({ props, nameCoin, chart }) => {
  const t = useTranslation()
  return (
    <div className="flex justify-between flex-col sm:flex-row">
      <ChartComponents coinName={nameCoin} chart={chart} />
      <div className="mt-12 pt-6 text-center w-60 max-sm:w-full">
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

const Item = (props) => {
  const t = useTranslation()
  return (
    <>
      <div className="flex justify-between p-[.8rem] list-group-item">
        <span className="text-gray-500">
          {numberToPersian('24H', t('dir') === 'rtl')}
        </span>
        <span className={`text-${props.day.colorDayIn}`}>
          {numberToPersian(props.day.dayIn, t('dir') === 'rtl') + '٪'}
          {(props.day.colorDayIn === 'red' && '-') ||
            (props.day.colorDayIn === 'green' && '+')}
        </span>
      </div>
      <div className="flex justify-between p-[.8rem] list-group-item">
        <span className="text-gray-500">
          {numberToPersian('7 ', t('dir') === 'rtl') +
            t('day') +
            ' ' +
            t('lately')}
        </span>
        <span className={`text-${props.day.colorDay7}`}>
          {numberToPersian(props.day.day7, t('dir') === 'rtl') + '٪'}
          {(props.day.colorDay7 === 'red' && '-') ||
            (props.day.colorDay7 === 'green' && '+')}
        </span>
      </div>
      <div className="flex justify-between p-[.8rem] list-group-item">
        <span className="text-gray-500">
          {numberToPersian('30 ', t('dir') === 'rtl') + t('day')}
        </span>
        <span className={`text-${props.day.colorDay30}`}>
          {numberToPersian(props.day.day30, t('dir') === 'rtl') + '٪'}
          {(props.day.colorDay30 === 'red' && '-') ||
            (props.day.colorDay30 === 'green' && '+')}
        </span>
      </div>
      <div className="flex justify-between p-[.8rem] list-group-item">
        <span className="text-gray-500">
          {numberToPersian('90 ', t('dir') === 'rtl') + t('day')}
        </span>
        <span className={'text-' + props.day.colorDay90}>
          {numberToPersian(props.day.day90 + '٪', t('dir') === 'rtl')}
          {(props.day.colorDay90 === 'red' && '-') ||
            (props.day.colorDay90 === 'green' && '+')}
        </span>
      </div>
      <div className="flex justify-between p-[.8rem] list-group-item">
        <span className="text-gray-500">
          {numberToPersian('180 ', t('dir') === 'rtl') + t('day')}
        </span>
        <span className={`text-${props.day.colorDay180}`}>
          {numberToPersian(props.day.day180, t('dir') === 'rtl') + '٪'}
          {(props.day.colorDay180 === 'red' && '-') ||
            (props.day.colorDay180 === 'green' && '+')}
        </span>
      </div>

      <div className="flex justify-between p-[.8rem] list-group-item">
        <span className="text-gray-500">
          {numberToPersian('365 ', t('dir') === 'rtl') + t('day')}
        </span>
        <span className={`text-${props.day.colorDay365}`}>
          {numberToPersian(props.day.day365, t('dir') === 'rtl') + '٪'}
          {(props.day.colorDay365 === 'red' && '-') ||
            (props.day.colorDay365 === 'green' && '+')}
        </span>
      </div>
      <div className="flex justify-between p-[.8rem] list-group-item">
        <span className="text-gray-500">{t('all')}</span>
        <span className={`text-${props.day.colorDayAll}`}>
          {numberToPersian(props.day.dayAll, t('dir') === 'rtl') + '٪'}
          {(props.day.colorDayAll === 'red' && '-') ||
            (props.day.colorDayAll === 'green' && '+')}
        </span>
      </div>
    </>
  )
}

export default Chart
