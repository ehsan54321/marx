import type { NextApiRequest, NextApiResponse } from 'next'

const chartData = [
  (39494 * 0.645) / 3,
  (39494 * 0.597) / 3,
  (39494 * 0.599) / 3,
  (39494 * 0.845) / 3,
  (39494 * 0.765) / 3,
  (39494 * 0.876) / 3,
  (39494 * 1.265) / 3,
  (39494 * 1.343) / 3,
  (39494 * 1.454) / 3,
  (39494 * 1.432) / 3,
  (39494 * 1.545) / 3,
  (39494 * 1.645) / 3,
  (39494 * 1.587) / 3,
  (39494 * 1.579) / 3,
  (39494 * 1.845) / 3,
  (39494 * 1.765) / 3,
  (39494 * 1.876) / 3,
  (39494 * 2.265) / 3,
  (39494 * 2.343) / 3,
  (39494 * 2.454) / 3,
  (39494 * 2.432) / 3,
  (39494 * 2.545) / 3,
  (39494 * 2.6) / 3,
  (39494 * 2.654) / 3,
]
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
]
const ApiPageCoin = (req: NextApiRequest, res: NextApiResponse) => {
  const { chart, item } = req.query
  if (!chart) {
    try {
      const data = require(`@util/coins/${req.query.coin}.json`)
      const dataFinish = {
        ...data,
        day: {
          colorDayIn: ~~(Math.random() * 100) <= 50 ? 'red' : 'green',
          dayIn: JSON.stringify(~~(Math.random() * 10) + 2),
          day7: 0.01,
          colorDay7: 'green',
          day30: 0,
          colorDay30: 'info',
          day90: 53.42,
          colorDay90: 'red',
          day180: 53.33,
          colorDay180: 'red',
          day365: 40.33,
          colorDay365: 'red',
          dayAll: 1406,
          colorDayAll: 'green',
        },
        chart: { data: chartData, labels },
      }
      res.status(200).json({
        rials: 39494,
        coin: dataFinish,
      })
    } catch {
      res.status(200).json('NotFound')
    }
  } else {
    res.status(200).json({
      data: [
        ...chartData,
        (39494 * 2.832) / 3,
        (39494 * 2.59) / 3,
        (39494 * 2.6) / 3,
        (39494 * 2.547) / 3,
      ],
      labels: [...labels, '9:20', '9:45', '10:00', '10:12'],
    })
  }
}

export default ApiPageCoin
