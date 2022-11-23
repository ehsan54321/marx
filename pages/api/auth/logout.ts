import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(
  function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy()
    res.status(200).json('Logged out')
  },
  {
    password: process.env.IRON_SESSION,
    cookieName: 'token',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
)
