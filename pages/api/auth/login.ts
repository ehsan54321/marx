import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

const Login = (req: NextApiRequest, res: NextApiResponse) => {
  const createToken = (token) => {
    return jwt.sign(token, process.env.JWT_SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '60d',
    })
  }
  const data = createToken(req.body)
  setCookie('token', data, {
    res,
    req,
    maxAge: 60 * 24 * 60,
    httpOnly: true,
    secure: true,
  })
  res.status(201).json({ data: req.body, status: 'SUCCESS' })
}

export default Login
