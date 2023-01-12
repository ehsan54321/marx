import classNames from 'classnames'
import http from '@services/httpServices'
import { CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Chart as ChartJS, LineElement, Title, Tooltip } from 'chart.js'
import { defaults } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { numberToPersian, resErr } from '@lib/helper'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)
const classBtn =
  'px-6 py-2.5 text-white transition duration-150 ease-in-out cursor-pointer'
defaults.font.family = 'vazir'
const ChartComponents = ({ coinName, chart }) => {
  const { t } = useTranslation()
  const [active, setActive] = useState<string>('24')
  const [data, setData] = useState(chart.data)
  const [labels, setLabels] = useState(chart.labels)
  const dataChart = {
    labels,
    datasets: [
      {
        id: 1,
        data,
        borderColor: '#f43f5e',
      },
    ],
  }
  const setNewData = (key) => {
    if (key === '24') {
      setData(chart.data)
      setLabels(chart.labels)
      setActive(key)
    } else {
      http
        .get(`api/v2/coins/${coinName}?chart=true&item=${key}`)
        .then((result) => {
          setData(result.data.data)
          setLabels(result.data.labels)
          setActive(key)
        })
        .catch((err) => {
          resErr(t)
        })
    }
  }
  return (
    <div className="sm:pl-4 w-full w-xm-75">
      <div className="divider flex">
        <h2 className="h6 m-0 px-4">{t('chart')}</h2>
      </div>
      <div className="flex flex-wrap">
        <button
          className={classNames(
            'rounded-r',
            classBtn,
            active === '24'
              ? 'bg-blue-800 hover:bg-blue-900'
              : 'bg-blue-600 hover:bg-blue-700'
          )}
          onClick={() => setNewData('24')}
        >
          <span>{numberToPersian('24', t('lang')) + ' ' + t('lately')}</span>
        </button>
        <MainBtnGroup
          setActive={setNewData}
          active={active}
          name="7"
          item={numberToPersian('7 ', t('lang')) + t('day') + ' ' + t('lately')}
        />
        <MainBtnGroup
          setActive={setNewData}
          active={active}
          name="30"
          item={numberToPersian('30 ', t('lang')) + t('day')}
        />
        <MainBtnGroup
          setActive={setNewData}
          active={active}
          name="90"
          item={numberToPersian('90 ', t('lang')) + t('day')}
        />
        <MainBtnGroup
          setActive={setNewData}
          active={active}
          name="180"
          item={numberToPersian('180 ', t('lang')) + t('day')}
        />
        <MainBtnGroup
          setActive={setNewData}
          active={active}
          name="360"
          item={numberToPersian('365 ', t('lang')) + t('day')}
        />
        <div className="vr"></div>
        <button
          className={classNames(
            'rounded-l',
            classBtn,
            active === 'all'
              ? 'bg-blue-800 hover:bg-blue-900'
              : 'bg-blue-600 hover:bg-blue-700'
          )}
          onClick={() => setNewData('all')}
        >
          <span>{t('all')}</span>
        </button>
      </div>
      <div className="bg-white mt-4">
        <Line options={{ responsive: true }} data={dataChart} />
      </div>
    </div>
  )
}

const MainBtnGroup = ({ name, active, setActive, item }) => {
  return (
    <>
      <div className="vr"></div>
      <button
        className={classNames(
          classBtn,
          active === name
            ? 'bg-blue-800 hover:bg-blue-900'
            : 'bg-blue-600 hover:bg-blue-700'
        )}
        onClick={() => setActive(name)}
      >
        <span>{item}</span>
      </button>
    </>
  )
}

export default ChartComponents
