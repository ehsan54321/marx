import jwt from 'jsonwebtoken'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

const User = (req: NextApiRequest, res: NextApiResponse) => {
  const data = getCookie('token', { res, req })
  const deCodeToken = (token) => {
    return jwt.decode(token, {
      complete: true,
      algorithm: 'HS256',
      expiresIn: '90d',
    })
  }
  if (data) res.status(200).json(deCodeToken(data).payload)
  else res.status(200).json('شما وارد نشدید')
}

export default User
