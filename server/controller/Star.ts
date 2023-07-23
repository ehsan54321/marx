import Star from '@/server/models/star'
import connectMongo from '@/util/connectMongo'

const AddStar = async ({ user_id, name, faName, id, poster_path }) => {
  await connectMongo()
  const starList = await Star.findOne({ user_id })
  if (starList) {
    const check = starList.coins.find((c) => c.name === name)
    if (check) return { status: 'WARNING' }
    else {
      const new_star = [...starList.coins, { name, faName, id, poster_path }]
      try {
        await Star.updateOne({ user_id }, { coins: new_star })
        return { status: 'SUCCESS' }
      } catch (error) {
        console.log(error)
        return { status: 'ERROR' }
      }
    }
  } else {
    const item = {
      user_id,
      coins: [{ name, faName, id, poster_path }],
    }
    try {
      await Star.create(item)
      return { status: 'SUCCESS' }
    } catch (error) {
      console.log(error)
      return { status: 'ERROR' }
    }
  }
}

const DelStar = async ({ user_id, name }) => {
  await connectMongo()
  const starList = await Star.findOne({ user_id })
  if (starList) {
    if (starList.coins.length == 1) {
      try {
        await Star.create()
        return { status: 'SUCCESS' }
      } catch (error) {
        console.log(error)
        return { status: 'ERROR' }
      }
    } else {
      const new_star = starList.coins.filter((coin) => coin.name !== name)
      try {
        await Star.updateOne({ user_id }, { coins: new_star })
        return { status: 'SUCCESS' }
      } catch (error) {
        console.log(error)
        return { status: 'ERROR' }
      }
    }
  } else return {}
}

const GetStar = async ({ id }) => {
  const starList = await Star.findOne({ user_id: id })
  if (starList.coins) {
    return starList.coins
  } else return {}
}

export { AddStar, DelStar, GetStar }
