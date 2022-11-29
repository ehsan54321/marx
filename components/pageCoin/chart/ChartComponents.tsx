import { Button, ButtonGroup } from 'react-bootstrap'
import { toPersian } from '@lib/helper'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ChartComponents = ({ props }) => {
  const [date, setDate] = useState<string>('24h')
  const { t } = useTranslation()
  const Handler = (e) => setDate(e.target.id)
  return (
    <div className="me-2 w-75">
      <div className="divider divider-horizontal" role="separator">
        <h2 className="h6 m-0 px-3">{t('chart')}</h2>
      </div>
      <ButtonGroup className="coinPage_btn flex-wrap">
        <Button
          variant="white"
          active={date === '24h'}
          onClick={Handler}
          id="24h"
        >
          {toPersian('24H', t('lang'))}
        </Button>
        <Button
          variant="white"
          active={date === '7d'}
          onClick={Handler}
          id="7d"
        >
          {toPersian('7 ', t('lang')) + t('day') + ' ' + t('lately')}
        </Button>
        <Button
          variant="white"
          active={date === '30d'}
          onClick={Handler}
          id="30d"
        >
          {toPersian('30 ', t('lang')) + t('day')}
        </Button>
        <Button
          variant="white"
          active={date === '90d'}
          onClick={Handler}
          id="90d"
        >
          {toPersian('90 ', t('lang')) + t('day')}
        </Button>
        <Button
          variant="white"
          active={date === '180d'}
          onClick={Handler}
          id="180d"
        >
          {toPersian('180 ', t('lang')) + t('day')}
        </Button>
        <Button
          variant="white"
          active={date === '365d'}
          onClick={Handler}
          id="365d"
        >
          {toPersian('365 ', t('lang')) + t('day')}
        </Button>
        <Button
          variant="white"
          active={date === 'all'}
          onClick={Handler}
          id="all"
        >
          {t('all')}
        </Button>
      </ButtonGroup>
      <div className="bg-white mt-3 d-none d-md-flex"></div>
    </div>
  )
}

export default ChartComponents
