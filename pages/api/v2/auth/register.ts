import http from '@services/httpServices'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next'
import persianDate from 'persian-date'
import type { NextApiRequest, NextApiResponse } from 'next'

const Register = (req: NextApiRequest, res: NextApiResponse) => {
  const createToken = (token) => {
    return jwt.sign(token, process.env.JWT_SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '90d',
    })
  }
  const date = new persianDate()
  const dataOBJ: any = {
    ...req.body,
    date: date.toLocale('en').format('YYYY/MM/DD'),
  }
  http
    .post('/api/v2/db/new/user', {
      [dataOBJ.email]: dataOBJ,
    })
    .then((r) => {
      if (r.data.status === 'SUCCESS') {
        setCookie('token', createToken(dataOBJ), {
          res,
          req,
          maxAge: 90 * 24 * 60,
          httpOnly: true,
          secure: true,
        })
        res.status(201).json({ data: dataOBJ, status: 'SUCCESS' })
      } else {
        res.status(200).json({ message: 'error', status: 'ERROR' })
      }
    })
}

export default Register
