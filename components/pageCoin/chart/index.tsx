import ChartComponents from './ChartComponents'
import classNames from 'classnames'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { Button, ListGroup } from 'react-bootstrap'
import { toPersian } from '@lib/helper'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Chart = ({ props, nameCoin }) => {
  const [show, setShow] = useState<boolean>(true)
  const [height, setHeight] = useState<number>()
  const chartContent = useRef(null)
  const { t } = useTranslation()
  useEffect(() => {
    const heightSize = chartContent.current.getBoundingClientRect().height
    setHeight(heightSize)
    chartContent.current.style.height = `${height}px`
  }, [])
  useEffect(() => {
    if (show) chartContent.current.style.height = `${height}px`
    else chartContent.current.style.height = `0`
  }, [show])
  return (
    <>
      {/* flex-column flex-sm-row */}
      <div
        className="d-flex justify-content-between coinPage_chart"
        ref={chartContent}
      >
        <ChartComponents props={props} />
        <div style={{ width: 220 }} className="mt-5 pt-4 text-center">
          <h2 className="h6 m-0 mb-2">
            {t('price.change') + ' (' + nameCoin.toUpperCase() + ')'}
          </h2>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between coinPage_listGroup">
              <span className="text-secondary">
                {toPersian('24H', t('lang'))}
              </span>
              <span className={`text-${props.day.colorDayIn}`}>
                {toPersian(props.day.dayIn, t('lang')) +
                  '٪' +
                  (props.day.colorDayIn.colorDayIn === 'danger' ? '-' : '+')}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between coinPage_listGroup">
              <span className="text-secondary">
                {toPersian('7 ', t('lang')) + t('day') + ' ' + t('lately')}
              </span>
              <span className={`text-${props.day.colorDay7}`}>
                {toPersian(props.day.day7, t('lang')) +
                  '٪' +
                  (props.day.colorDay7.colorDay7 === 'danger' ? '-' : '+')}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between coinPage_listGroup">
              <span className="text-secondary">
                {toPersian('30 ', t('lang')) + t('day')}
              </span>
              <span className={`text-${props.day.colorDay30}`}>
                {toPersian(props.day.day30, t('lang')) +
                  '٪' +
                  (props.day.colorDay30.colorDay30 === 'danger' ? '-' : '+')}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between coinPage_listGroup">
              <span className="text-secondary">
                {toPersian('90 ', t('lang')) + t('day')}
              </span>
              <span className={`text-${props.day.colorDay90}`}>
                {toPersian(props.day.day90 + '٪', t('lang')) +
                  (props.day.colorDay90.colorDay90 === 'danger' ? '-' : '+')}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between coinPage_listGroup">
              <span className="text-secondary">
                {toPersian('180 ', t('lang')) + t('day')}
              </span>
              <span className={`text-${props.day.colorDay180}`}>
                {toPersian(props.day.day180, t('lang')) +
                  '٪' +
                  (props.day.colorDay180 === 'danger' ? '-' : '+')}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between coinPage_listGroup">
              <span className="text-secondary">
                {toPersian('365 ', t('lang')) + t('day')}
              </span>
              <span className={`text-${props.day.colorDay365}`}>
                {toPersian(props.day.day365, t('lang')) +
                  '٪' +
                  (props.day.colorDay365 === 'danger' ? '-' : '+')}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between coinPage_listGroup">
              <span className="text-secondary">{t('all')}</span>
              <span className={`text-${props.day.colorDayAll}`}>
                {toPersian(props.day.dayAll, t('lang')) +
                  '٪' +
                  (props.day.colorDayAll === 'danger' ? '-' : '+')}
              </span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
      <div className={`mt-4 text-${show ? 'start' : 'end'}`}>
        <Button variant="success" onClick={() => setShow(!show)}>
          {show ? (
            <div>
              <BsFillCaretUpFill />
              <span>{' ' + t('close') + ' ' + t('chart')}</span>
            </div>
          ) : (
            <div>
              <span>{t('open') + ' ' + t('chart') + ' '}</span>
              <BsFillCaretDownFill />
            </div>
          )}
        </Button>
      </div>
    </>
  )
}

export default Chart
