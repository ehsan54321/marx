import type { NextApiRequest, NextApiResponse } from 'next'

const ApiPageCoin = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = require(`@util/coins/${req.query.coin}.json`)
    const dataFinish = {
      ...data,
      day: {
        colorDayIn: ~~(Math.random() * 100) <= 50 ? 'danger' : 'success',
        dayIn: JSON.stringify(~~(Math.random() * 10) + 2),
        day7: 0.01,
        colorDay7: 'success',
        day30: 32.72,
        colorDay30: 'danger',
        day90: 53.42,
        colorDay90: 'danger',
        day180: 53.33,
        colorDay180: 'danger',
        day365: 40.33,
        colorDay365: 'danger',
        dayAll: 1406,
        colorDayAll: 'success',
      },
      chart: {
        '24h': [
          { x: 9, y: 8987 },
          { x: 8, y: 5987 },
          { x: 7, y: 5298 },
          { x: 6, y: 9876 },
          { x: 5, y: 5548 },
          { x: 4, y: 5990 },
          { x: 3, y: 7659 },
          { x: 2, y: 5987 },
          { x: 1, y: 5009 },
        ],
        '7d': [
          { x: 9, y: 7654 },
          { x: 8, y: 2345 },
          { x: 7, y: 7654 },
          { x: 6, y: 7654 },
          { x: 5, y: 7654 },
          { x: 4, y: 6990 },
          { x: 3, y: 7659 },
          { x: 2, y: 8765 },
          { x: 1, y: 5432 },
        ],
        '30d': [
          { x: 9, y: 5432 },
          { x: 8, y: 5987 },
          { x: 7, y: 7654 },
          { x: 6, y: 8876 },
          { x: 5, y: 7654 },
          { x: 4, y: 4990 },
          { x: 3, y: 5654 },
          { x: 2, y: 5987 },
          { x: 1, y: 3009 },
        ],
        '90d': [
          { x: 9, y: 8987 },
          { x: 8, y: 5987 },
          { x: 7, y: 76543 },
          { x: 6, y: 9876 },
          { x: 5, y: 7653 },
          { x: 4, y: 8765 },
          { x: 3, y: 7659 },
          { x: 2, y: 5987 },
          { x: 1, y: 3009 },
        ],
        '180d': [
          { x: 9, y: 4326 },
          { x: 8, y: 4873 },
          { x: 7, y: 3453 },
          { x: 6, y: 4522 },
          { x: 5, y: 7652 },
          { x: 4, y: 4874 },
          { x: 3, y: 3453 },
          { x: 2, y: 5433 },
          { x: 1, y: 4432 },
        ],
        '365d': [
          { x: 9, y: 8987 },
          { x: 8, y: 2345 },
          { x: 7, y: 4098 },
          { x: 6, y: 9876 },
          { x: 5, y: 1548 },
          { x: 4, y: 3456 },
          { x: 3, y: 4567 },
          { x: 2, y: 3456 },
          { x: 1, y: 562 },
        ],
        all: [
          { x: 9, y: 8987 },
          { x: 8, y: 5987 },
          { x: 7, y: 34567 },
          { x: 6, y: 3434 },
          { x: 5, y: 2548 },
          { x: 4, y: 7654 },
          { x: 3, y: 7654 },
          { x: 2, y: 5987 },
          { x: 1, y: 6540 },
        ],
      },
    }
    res.status(200).json({
      rials: 28567,
      coin: dataFinish,
    })
  } catch {
    res.status(200).json('NotFound')
  }
}

export default ApiPageCoin
