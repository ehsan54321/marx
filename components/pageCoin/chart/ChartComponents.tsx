import classNames from 'classnames'
import http from '@services/httpServices'
import { CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Chart as ChartJS, defaults, LineElement, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { formatThousands, numberToPersian, resErr } from '@lib/helper'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)
defaults.font.family = 'vazir'
defaults.color = '#999'
defaults.scale.grid.color = 'rgb(241, 245, 249)'
defaults.plugins.tooltip.titleColor = 'rgb(30, 41, 59)'
defaults.plugins.tooltip.bodyColor = 'rgb(30, 41, 59)'
defaults.plugins.tooltip.backgroundColor = '#fff'
defaults.plugins.tooltip.borderWidth = 1
defaults.plugins.tooltip.borderColor = '#ddd'
defaults.plugins.tooltip.displayColors = false
defaults.plugins.tooltip.mode = 'nearest'
defaults.plugins.tooltip.intersect = false
defaults.plugins.tooltip.caretPadding = 8
defaults.plugins.tooltip.cornerRadius = 4
defaults.plugins.tooltip.padding = 8
const ChartComponents = ({ coinName, chart }) => {
  const { t } = useTranslation()
  const [active, setActive] = useState<string>('24')
  const [data, setData] = useState(chart.data)
  const [labels, setLabels] = useState(chart.labels)
  const btn = [
    {
      name: '24',
      label: numberToPersian('24', t('lang')) + ' ' + t('lately'),
    },
    {
      name: '7',
      label: numberToPersian('7 ', t('lang')) + t('day') + ' ' + t('lately'),
    },
    { name: '30', label: numberToPersian('30 ', t('lang')) + t('day') },
    { name: '90', label: numberToPersian('90 ', t('lang')) + t('day') },
    { name: '180', label: numberToPersian('180 ', t('lang')) + t('day') },
    { name: '360', label: numberToPersian('365 ', t('lang')) + t('day') },
    { name: 'all', label: t('all') },
  ]
  const dataChart = {
    labels,
    datasets: [
      {
        id: 1,
        data,
        fill: true,
        backgroundColor: '#f43f5e',
        borderColor: '#f43f5e',
        borderWidth: 2.6,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: '#f43f5e',
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
        .catch((err) => resErr(t))
    }
  }
  return (
    <div className="sm:pl-4 w-full w-xm-75">
      <div className="divider flex">
        <h2 className="h6 m-0 px-4">{t('chart')}</h2>
      </div>
      <div className="flex flex-wrap coinPage_group">
        {btn.map((item) => (
          <button
            className={classNames(
              'px-6 py-2.5 text-white transition duration-150 ease-in-out cursor-pointer border-l border-solid border-gray-100',
              active === item.name
                ? 'bg-blue-800 hover:bg-blue-900'
                : 'bg-blue-600 hover:bg-blue-700'
            )}
            key={item.name}
            onClick={() => setNewData(item.name)}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="bg-white mt-4">
        <Line
          options={{
            responsive: true,
            scales: {
              y: {
                ticks: {
                  callback: (value) => formatThousands(value),
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
            interaction: {
              intersect: false,
              mode: 'nearest',
            },
          }}
          data={dataChart}
        />
      </div>
    </div>
  )
}

export default ChartComponents
