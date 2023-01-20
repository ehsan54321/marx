import http from '@services/httpServices'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next'
import persianDate from 'persian-date'
import type { NextApiRequest, NextApiResponse } from 'next'

const Register = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (process.env.NODE_ENV === 'production') {
      res.status(200).json({
        message: 'شما اجازه ساخت حساب کاربری را ندارید!',
        status: 'ERROR',
      })
    } else {
      const createToken = (token) => {
        return jwt.sign(token, process.env.JWT_SECRET_KEY, {
          algorithm: 'HS256',
          expiresIn: '60d',
        })
      }
      const date = new persianDate()
      const dataOBJ = {
        ...req.body,
        date: date.toLocale('en').format('YYYY/MM/DD'),
      }
      const dataOBJClint = {
        ...dataOBJ,
        password: undefined,
      }
      http
        .post('/api/v2/db/new/user', {
          data: { [dataOBJ.email]: dataOBJ },
          email: dataOBJ.email,
        })
        .then((r) => {
          if (r.data.status === 'SUCCESS') {
            setCookie('token', createToken(dataOBJClint), {
              res,
              req,
              maxAge: 2 * 30 * 24 * 60 * 60,
              httpOnly: true,
              secure: true,
            })
            res.status(201).json({ status: 'SUCCESS' })
          } else if (r.data.message) {
            res.status(200).json({ message: r.data.message, status: 'ERROR' })
          } else {
            res.status(200).json({ message: 'error', status: 'ERROR' })
          }
        })
    }
  } else res.send('req "' + req.method + '" is not defined')
}

export default Register
