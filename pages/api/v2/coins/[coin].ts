import type { NextApiRequest, NextApiResponse } from 'next'

const ApiPageCoin = (req: NextApiRequest, res: NextApiResponse) => {
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
    }
    res.status(200).json({
      rials: 34856,
      coin: dataFinish,
    })
  } catch {
    res.status(200).json('NotFound')
  }
}

export default ApiPageCoin
