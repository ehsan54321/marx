import axios from 'axios'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(
  async (req: any, res) => {
    const body: any = req.body
    const data: any = {
      ...body,
      poster_path:
        'https://www.gravatar.com/avatar/4e7f0e6f71df72220e4ce37c92c377e3?s=185&d=identicon&r;=PG',
      is_admin: false,
    }
    const prevData = (await axios.get('http://localhost:8000/user')).data
    axios
      .post('http://localhost:8000/user', { ...prevData, [data.email]: data })
      .then(async (r) => {
        req.session.user = data
        await req.session.save()
        res.status(201).json({ data, status: 'SUCCESS' })
      })
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
