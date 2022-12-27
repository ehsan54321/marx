import type { NextApiRequest, NextApiResponse } from 'next'

const ApiPageHome = (req: NextApiRequest, res: NextApiResponse) => {
  const { pageItem }: any = req.query
  const pageSize = Math.ceil(coins.length / pageItem)
  res.status(200).json({ coins, rials: 34856, pageSize })
}

const coins = [
  {
    id: 1,
    key: 'btc',
    name: 'بیت کوین',
    all_name: 'Bitcoin',
    poster_path: 'bitcoin',
    usd: 17089,
    day: {
      day_in: 0.15,
      color_day_in: 'red',
      day7: 1.6,
      color_day7: 'green',
    },
  },
  {
    id: 2,
    key: 'eth',
    name: 'اتریوم',
    all_name: 'Ethereum',
    poster_path: 'ethereum',
    usd: ~~(Math.random() * 10000),
    day: {
      day_in: ~~(Math.random() * 10) + 2,
      color_day_in: 'red',
      day7: ~~(Math.random() * 100),
      color_day7: 'green',
    },
  },
  {
    id: 3,
    key: 'usdt',
    name: 'تتر',
    all_name: 'Tether',
    poster_path: 'usdt',
    usd: 1,
    day: {
      day_in: 0,
      color_day_in: 'info',
      day7: 0.1,
      color_day7: 'red',
    },
  },
  {
    id: 4,
    key: 'doge',
    name: 'دوج کوین',
    all_name: 'Dogecoin',
    poster_path: 'dogecoin',
    usd: 0.103,
    day: {
      day_in: 0.56,
      color_day_in: 'red',
      day7: 2,
      color_day7: 'green',
    },
  },
  {
    id: 5,
    key: 'ltc',
    name: 'لایت کوین',
    all_name: 'Litecoin',
    poster_path: 'litecoin',
    usd: 19,
    day: {
      day_in: 0.6,
      color_day_in: 'red',
      day7: 6.4,
      color_day7: 'red',
    },
  },
  {
    id: 6,
    key: 'bnb',
    name: 'بایننس',
    all_name: 'Binance',
    poster_path: 'bnb',
    usd: 45.57,
    day: {
      day_in: 0.9,
      color_day_in: 'green',
      day7: 8.9,
      color_day7: 'green',
    },
  },
  {
    id: 7,
    key: 'ada',
    name: 'کاردانو',
    all_name: 'Cardano',
    poster_path: 'ada',
    usd: 5.91,
    day: {
      day_in: 5.1,
      color_day_in: 'green',
      day7: 0.9,
      color_day7: 'red',
    },
  },
  {
    id: 8,
    key: 'usdc',
    name: 'یو اس دی',
    all_name: 'USD Coin',
    poster_path: 'usdc',
    usd: 0.957,
    day: {
      day_in: 0.6,
      color_day_in: 'red',
      day7: 8.9,
      color_day7: 'green',
    },
  },
  {
    id: 9,
    key: 'dot',
    name: 'پولکادات',
    all_name: 'Polkadot',
    poster_path: 'dot',
    usd: 64.57,
    day: {
      day_in: 0.1,
      color_day_in: 'green',
      day7: 0.3,
      color_day7: 'green',
    },
  },
  {
    id: 10,
    key: 'uni',
    name: 'فلوکس',
    all_name: 'Uniswap',
    poster_path: 'uni',
    usd: 0.787,
    day: {
      day_in: 9,
      color_day_in: 'green',
      day7: 8,
      color_day7: 'green',
    },
  },
  {
    id: 11,
    key: 'xrp',
    name: 'ریپل',
    all_name: 'Xrp',
    poster_path: 'xrp',
    usd: 787,
    day: {
      day_in: 0,
      color_day_in: 'info',
      day7: 9,
      color_day7: 'red',
    },
  },
  {
    id: 12,
    key: 'dai',
    name: 'دای',
    all_name: 'Dai',
    poster_path: 'dai',
    usd: 0.997,
    day: {
      day_in: 12,
      color_day_in: 'green',
      day7: 8,
      color_day7: 'green',
    },
  },
  {
    id: 13,
    key: 'sol',
    name: 'سولانا',
    all_name: 'Solana',
    poster_path: 'sol',
    usd: 2158,
    day: {
      day_in: 9,
      color_day_in: 'green',
      day7: 9,
      color_day7: 'green',
    },
  },
  {
    id: 14,
    key: 'trx',
    name: 'ترون',
    all_name: 'Tron',
    poster_path: 'tron',
    usd: 2.57,
    day: {
      day_in: 8,
      color_day_in: 'red',
      day7: 6,
      color_day7: 'red',
    },
  },
  {
    id: 15,
    key: 'avax',
    name: 'بهمن',
    all_name: 'Avalanche',
    poster_path: 'avax',
    usd: 25,
    day: {
      day_in: 4.6,
      color_day_in: 'green',
      day7: 1.7,
      color_day7: 'red',
    },
  },
  {
    id: 16,
    key: 'shib',
    name: 'شیبا',
    all_name: 'Shiba Inu',
    poster_path: 'shib',
    usd: 8.56,
    day: {
      day_in: 0,
      color_day_in: 'info',
      day7: 0,
      color_day7: 'info',
    },
  },
  {
    id: 17,
    key: 'wbtc',
    name: 'پیچیده شده',
    all_name: 'Wrapped Bitcoin',
    poster_path: 'wbtc',
    usd: 258,
    day: {
      day_in: 1.2,
      color_day_in: 'red',
      day7: 3.4,
      color_day7: 'red',
    },
  },
  {
    id: 18,
    key: 'ftt',
    name: 'توکن FTX',
    all_name: 'FTX Token',
    poster_path: 'ftx',
    usd: 0.158,
    day: {
      day_in: 0.14,
      color_day_in: 'green',
      day7: 0.14,
      color_day7: 'green',
    },
  },
  {
    id: 19,
    key: 'cro',
    name: 'کریپتو',
    all_name: 'Cronos',
    poster_path: 'cro',
    usd: 28,
    day: {
      day_in: 0.76,
      color_day_in: 'red',
      day7: 0.7,
      color_day7: 'red',
    },
  },
  {
    id: 20,
    key: 'link',
    name: 'لینک زنجیره',
    all_name: 'Chainlink',
    poster_path: 'link',
    usd: 25,
    day: {
      day_in: 3.6,
      color_day_in: 'green',
      day7: 3.6,
      color_day7: 'green',
    },
  },
  {
    id: 21,
    key: 'aave',
    name: 'آوه',
    all_name: 'aave',
    poster_path: 'aave',
    usd: 63.29,
    day: {
      day_in: 3.6,
      color_day_in: 'green',
      day7: 6,
      color_day7: 'green',
    },
  },
  {
    id: 22,
    key: 'yfi',
    name: 'یرن فایننس',
    all_name: 'Yearn Finance',
    poster_path: 'yfi',
    usd: 7216.18,
    day: {
      day_in: 3,
      color_day_in: 'red',
      day7: 8.29,
      color_day7: 'red',
    },
  },
  {
    id: 23,
    key: 'xlm',
    name: 'استلار',
    all_name: 'stellar',
    poster_path: 'stellar',
    usd: 0.9,
    day: {
      day_in: 2.23,
      color_day_in: 'red',
      day7: 3.6,
      color_day7: 'green',
    },
  },
  {
    id: 24,
    key: 'bch',
    name: 'بیت کوین کش',
    all_name: 'Bitcoin Cash',
    poster_path: 'bitcoin-cash',
    usd: 110.57,
    day: {
      day_in: 1.9,
      color_day_in: 'red',
      day7: 1.12,
      color_day7: 'red',
    },
  },
  {
    id: 25,
    key: 'ape',
    name: 'ایپ کوین',
    all_name: 'Ape Coin',
    poster_path: 'ape',
    usd: 4.1,
    day: {
      day_in: 3.53,
      color_day_in: 'green',
      day7: 4.26,
      color_day7: 'red',
    },
  },
  {
    id: 26,
    key: 'eos',
    name: 'ایاس',
    all_name: 'Eos',
    poster_path: 'eos',
    usd: 0.95,
    day: {
      day_in: 0.67,
      color_day_in: 'green',
      day7: 4.26,
      color_day7: 'red',
    },
  },
  {
    id: 27,
    key: 'sand',
    name: 'سندباکس',
    all_name: 'The Sandbox',
    poster_path: 'sand',
    usd: 0.6111,
    day: {
      day_in: 0.64,
      color_day_in: 'green',
      day7: 0.26,
      color_day7: 'green',
    },
  },
  {
    id: 28,
    key: 'rune',
    name: 'تورچین',
    all_name: 'THORChain',
    poster_path: 'rune',
    usd: 1.37,
    day: {
      day_in: 3.41,
      color_day_in: 'green',
      day7: 0,
      color_day7: 'info',
    },
  },
  {
    id: 29,
    key: 'bat',
    name: 'بت',
    all_name: 'Basic Attention Token',
    poster_path: 'bat',
    usd: 0.2317,
    day: {
      day_in: 0.36,
      color_day_in: 'red',
      day7: 0.26,
      color_day7: 'red',
    },
  },
  {
    id: 30,
    key: 'dydx',
    name: 'دی وای دی ایکس',
    all_name: 'dYdX',
    poster_path: 'dydx',
    usd: 1.73,
    day: {
      day_in: 0.19,
      color_day_in: 'red',
      day7: 0.57,
      color_day7: 'red',
    },
  },
  {
    id: 31,
    key: 'cvx',
    name: 'کانوکس فایننس',
    all_name: 'Convex Finance',
    poster_path: 'cvx',
    usd: 3.94,
    day: {
      day_in: 0.42,
      color_day_in: 'green',
      day7: 0.16,
      color_day7: 'green',
    },
  },
  {
    id: 32,
    key: 'matic',
    name: 'متیک',
    all_name: 'Polygon',
    poster_path: 'matic',
    usd: 0.905,
    day: {
      day_in: 2.8,
      color_day_in: 'green',
      day7: 1.1,
      color_day7: 'red',
    },
  },
  {
    id: 33,
    key: 'axs',
    name: 'اکسی اینفینیتی',
    all_name: 'Axie Infinity',
    poster_path: 'axs',
    usd: 8.95,
    day: {
      day_in: 1.44,
      color_day_in: 'red',
      day7: 1.29,
      color_day7: 'red',
    },
  },
  {
    id: 34,
    key: 'knc',
    name: 'کایبر نتورک',
    all_name: 'Kyber Network',
    poster_path: 'knc',
    usd: 8.95,
    day: {
      day_in: 0,
      color_day_in: 'info',
      day7: 1.12,
      color_day7: 'red',
    },
  },
  {
    id: 35,
    key: 'fxs',
    name: 'ایپ کوین',
    all_name: 'Frax Share',
    poster_path: 'fxs',
    usd: 5.33,
    day: {
      day_in: 0.1,
      color_day_in: 'red',
      day7: 0,
      color_day7: 'info',
    },
  },
  {
    id: 36,
    key: 'mana',
    name: 'مانا',
    all_name: 'Decentraland MANA',
    poster_path: 'mana',
    usd: 0.416,
    day: {
      day_in: 1.75,
      color_day_in: 'red',
      day7: 7.06,
      color_day7: 'green',
    },
  },
  {
    id: 37,
    key: 'ftm',
    name: 'فانتوم',
    all_name: 'Fantom',
    poster_path: 'ftm',
    usd: 0.246,
    day: {
      day_in: 1,
      color_day_in: 'green',
      day7: 4.58,
      color_day7: 'green',
    },
  },
  {
    id: 38,
    key: 'near',
    name: 'نیر پروتکل',
    all_name: 'NEAR Protocol',
    poster_path: 'near',
    usd: 1.37,
    day: {
      day_in: 0.76,
      color_day_in: 'green',
      day7: 10.52,
      color_day7: 'green',
    },
  },
  {
    id: 39,
    key: 'cake',
    name: 'پنکیک سواپ',
    all_name: 'Pancake Swap',
    poster_path: 'cake',
    usd: 3.95,
    day: {
      day_in: 0.14,
      color_day_in: 'red',
      day7: 0.1,
      color_day7: 'red',
    },
  },
  {
    id: 40,
    key: 'gala',
    name: 'گالا',
    all_name: 'Gala',
    poster_path: 'gala',
    usd: 0.0273,
    day: {
      day_in: 1.44,
      color_day_in: 'green',
      day7: 0.26,
      color_day7: 'red',
    },
  },
  {
    id: 41,
    key: 'atom',
    name: 'اتم',
    all_name: 'Cosmos',
    poster_path: 'atom',
    usd: 10.07,
    day: {
      day_in: 1.51,
      color_day_in: 'green',
      day7: 7.45,
      color_day7: 'green',
    },
  },
  {
    id: 42,
    key: 'enj',
    name: 'انجین',
    all_name: 'Enjin coin',
    poster_path: 'enj',
    usd: 0.3137,
    day: {
      day_in: 2.57,
      color_day_in: 'green',
      day7: 10.6,
      color_day7: 'green',
    },
  },
]

export default ApiPageHome
