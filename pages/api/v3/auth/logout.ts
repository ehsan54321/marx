<<<<<<< HEAD
import { deleteCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await deleteCookie('token', { res, req })
    res.status(200).json({ status: 'SUCCESS' })
  } catch {
    res.status(500).json({ status: 'ERROR' })
  }
}

export default Logout
=======
import { deleteCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await deleteCookie('token', { res, req })
    res.status(200).json({ status: 'SUCCESS' })
  } catch {
    res.status(500).json({ status: 'ERROR' })
  }
}

export default Logout
>>>>>>> 1bd3d58 (start git)
