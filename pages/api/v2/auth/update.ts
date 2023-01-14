import http from '@services/httpServices'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

const Update = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (process.env.NODE_ENV === 'production') {
      res.status(200).json({
        message: 'شما اجازه تغییر نام کاربری را ندارید!',
        status: 'ERROR',
      })
    } else {
      const { username, email, date } = req.body
      const createToken = () => {
        const token = { email, username, date }
        return jwt.sign(token, process.env.JWT_SECRET_KEY, {
          algorithm: 'HS256',
          expiresIn: '60d',
        })
      }
      http.post('/api/v2/db/update/user', { username, email }).then(() => {
        setCookie('token', createToken(), {
          res,
          req,
          maxAge: 2 * 30 * 24 * 60 * 60,
          httpOnly: true,
          secure: true,
        })
        res.status(200).json({ status: 'SUCCESS' })
      })
    }
  } else res.send('req "' + req.method + '" is not defined')
}

export default Update
