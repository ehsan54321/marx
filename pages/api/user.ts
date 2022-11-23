import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(
  async (req: any, res) => {
    const data: any = req.session.user

    if (data) {
      res.status(200).json({ data, status: 'SUCCESS' })
    } else {
      res.status(200).json({ message: 'on login', status: 'ERROR' })
    }
  },
  {
    password: process.env.IRON_SESSION,
    cookieName: 'token',
    cookieOptions: {
      httpOnly: !!(process.env.NODE_ENV === 'production'),
      secure: !!(process.env.NODE_ENV === 'production'),
      maxAge: 3500000,
    },
  }
)
