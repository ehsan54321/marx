import { DelStar } from '@/server/controller/Star'
import { NextApiRequest, NextApiResponse } from 'next'

const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status } = await DelStar({ ...req.body })

  res.status(200).json({ status })
}

export default Delete
