import { AddStar } from '@/server/controller/Star'
import { NextApiRequest, NextApiResponse } from 'next'

const User = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status } = await AddStar({ ...req.body })

  res.status(200).json({ status })
}

export default User
