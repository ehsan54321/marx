import { toPersian } from '@lib/helper'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ChartComponents = () => {
  const { t } = useTranslation()
  return (
    <div className="me-2 w-75">
      <div className="divider divider-horizontal" role="separator">
        <h2 className="h6 m-0 px-3">{t('chart')}</h2>
      </div>
      {/* chart */}
      <div className="bg-white mt-3 d-none d-md-flex"></div>
    </div>
  )
}

export default ChartComponents
