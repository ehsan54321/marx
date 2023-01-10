import AllUser from '@util/db/user.json'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

const Login = (req: NextApiRequest, res: NextApiResponse) => {
  const { password, email, lang } = req.body
  const users = AllUser.user
  if (users[email] && users[email].password === password) {
    const token = {
      email,
      username: users[email].username,
      date: users[email].date,
    }
    const createToken = () => {
      return jwt.sign(token, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '60d',
      })
    }
    setCookie('token', createToken(), {
      res,
      req,
      maxAge: 2 * 30 * 24 * 60 * 60,
      httpOnly: true,
      secure: true,
    })
    res.status(201).json({ data: token, status: 'SUCCESS' })
  } else {
    res.status(200).json({
      message: lang
        ? 'ایمیل یا رمز عبور درستی نیست!'
        : '!Incorrect email or password',
      status: 'ERROR',
    })
  }
}

export default Login
