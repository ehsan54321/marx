import jwt from 'jsonwebtoken'
import persianDate from 'persian-date'
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
      const { payload } = deCodeToken(data)
      res.status(200).json({
        user: {
          email: payload.email,
          date: payload.date,
          name: payload.username,
        },
        iat: new persianDate.unix(payload.iat)
          .toLocale('en')
          .format('YYYY/MM/DD'),
        expires: new persianDate.unix(payload.exp)
          .toLocale('en')
          .format('YYYY/MM/DD'),
      })
    } catch {
      res.status(200).json('شما وارد نشدید')
    }
  } else res.status(200).json('شما وارد نشدید')
}

export default User
