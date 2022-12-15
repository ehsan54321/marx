import { useTranslation } from 'react-i18next'

const ChartComponents = () => {
  const { t } = useTranslation()
  return (
    <div className="me-2 w-75">
      <div className="divider d-flex">
        <h2 className="h6 m-0 px-3">{t('chart')}</h2>
      </div>
      {/* chart */}
      <div className="bg-white mt-3"></div>
    </div>
  )
}

export default ChartComponents
