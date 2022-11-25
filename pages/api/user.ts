import jwt from 'jsonwebtoken'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'

const User = (req: NextApiRequest, res: NextApiResponse) => {
  const data = getCookie('token', { res, req })
  const deCodeToken = (token) => {
    return jwt.decode(token, {
      complete: true,
      algorithm: 'HS256',
      expiresIn: '7d',
    })
  }
  if (data) {
    res.status(201).json({ data: deCodeToken(data).payload, status: 'SUCCESS' })
  } else {
    res.status(200).json({ message: 'on login', status: 'ERROR' })
  }
}

export default User
