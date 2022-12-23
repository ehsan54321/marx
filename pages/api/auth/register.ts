import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import http from '@services/httpServices'

const Register = (req: NextApiRequest, res: NextApiResponse) => {
  const createToken = (token) => {
    return jwt.sign(token, process.env.JWT_SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '90d',
    })
  }
  const dataOBJ: any = {
    ...req.body,
    poster_path:
      'https://www.gravatar.com/avatar/4e7f0e6f71df72220e4ce37c92c377e3?s=185&d=identicon&r;=PG',
    is_admin: false,
  }
  http
    .post('/api/db/new/user', {
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
        res.status(200).json({ status: 'ERROR' })
      }
    })
}

export default Register
