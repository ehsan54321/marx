import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(
  async (req: any, res) => {
    const token = req.body

    req.session.user = token
    await req.session.save()
    res.status(201).json({ data: token, status: 'SUCCESS' })
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
