import { removeCookies } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

const Logout = (req: NextApiRequest, res: NextApiResponse) => {
  removeCookies('token', { res, req })
  res.status(200).json('logout successfully')
}

export default Logout
