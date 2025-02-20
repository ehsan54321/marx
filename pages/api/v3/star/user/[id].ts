import { GetStar } from '@/server/controller/Star'
import { NextApiRequest, NextApiResponse } from 'next'

const User = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const star = await GetStar({ id })

  res.status(200).json(star)
}

export default User
