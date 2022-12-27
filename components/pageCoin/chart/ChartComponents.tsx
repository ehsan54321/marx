import { defaults } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

defaults.font.family = 'vazir'
const ChartComponents = ({ usd }) => {
  const { t } = useTranslation()
  // numberToPersian('7 ', t('lang')) + t('day') + ' ' + t('lately'),
  // numberToPersian('30 ', t('lang')) + t('day'),
  // numberToPersian('90 ', t('lang')) + t('day'),
  // numberToPersian('180 ', t('lang')) + t('day'),
  // numberToPersian('365 ', t('lang')) + t('day'),
  // t('all'),
  const labels = [
    '3:20', // 1
    '3:45', // 2
    '4:00', // 3
    '4:12', // 4
    '4:20', // 5
    '4:45', // 6
    '5:00', // 7
    '5:12', // 8
    '5:20', // 9
    '5:45', // 10
    '6:00', // 11
    '6:12', // 12
    '6:20', // 13
    '6:45', // 14
    '7:00', // 15
    '7:12', // 16
    '7:20', // 17
    '7:45', // 18
    '8:00', // 19
    '8:12', // 20
    '8:20', // 21
    '8:45', // 22
    '9:00', // 23
    '9:12', // 24
    '9:20', // 25
    '9:45', // 26
    '10:00', // 27
    '10:12', // 28
  ]

  const data = {
    labels,
    datasets: [
      {
        id: 1,
        data: [
          (usd * 0.645) / 3,
          (usd * 0.597) / 3,
          (usd * 0.599) / 3,
          (usd * 0.845) / 3,
          (usd * 0.765) / 3,
          (usd * 0.876) / 3,
          (usd * 1.265) / 3,
          (usd * 1.343) / 3,
          (usd * 1.454) / 3,
          (usd * 1.432) / 3,
          (usd * 1.545) / 3,
          (usd * 1.645) / 3,
          (usd * 1.587) / 3,
          (usd * 1.579) / 3,
          (usd * 1.845) / 3,
          (usd * 1.765) / 3,
          (usd * 1.876) / 3,
          (usd * 2.265) / 3,
          (usd * 2.343) / 3,
          (usd * 2.454) / 3,
          (usd * 2.432) / 3,
          (usd * 2.545) / 3,
          (usd * 2.6) / 3,
          (usd * 2.654) / 3,
          (usd * 2.832) / 3,
          (usd * 2.59) / 3,
          (usd * 2.6) / 3,
          (usd * 2.547) / 3,
        ],
        borderColor: '#f43f5e',
      },
    ],
  }
  return (
    <div className="pe-sm-3 w-100 w-xm-75">
      <div className="divider d-flex">
        <h2 className="h6 m-0 px-3">{t('chart')}</h2>
      </div>
      <div className="bg-white mt-3">
        <Line
          options={{
            responsive: true,
          }}
          data={data}
        />
      </div>
    </div>
  )
}

export default ChartComponents
