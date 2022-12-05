import axios from 'axios'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from '@services/httpServices'

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
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
  const prevData = (await axios.get('http://localhost:8000/user', config)).data
  axios
    .post(
      'http://localhost:8000/user',
      {
        ...prevData,
        [dataOBJ.email]: dataOBJ,
      },
      config
    )
    .then((r) => {
      setCookie('token', createToken(dataOBJ), {
        res,
        req,
        maxAge: 90 * 24 * 60,
        httpOnly: true,
        secure: true,
      })
      res.status(201).json({ data: dataOBJ, status: 'SUCCESS' })
    })
}

export default Register
