import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

const User = (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.cookies.token
  const deCodeToken = (token) => {
    return jwt.decode(token, {
      complete: true,
      algorithm: 'HS256',
      expiresIn: '60d',
    })
  }
  if (data) {
    try {
      res.status(200).json({
        ...deCodeToken(data).payload,
        exp: undefined,
        iat: undefined,
      })
    } catch {
      res.status(200).json('شما وارد نشدید')
    }
  } else res.status(200).json('شما وارد نشدید')
}

export default User
