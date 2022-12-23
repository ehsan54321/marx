import AllUser from '@util/db/user.json'
import type { NextApiRequest, NextApiResponse } from 'next'

const User = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(AllUser.user)
}

export default User
