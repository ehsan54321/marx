import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserAuthentication } from '@/server/controller/User'

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { password, email, lang } = req.body
    try {
      const { status, token } = await UserAuthentication({
        email,
        password,
      })
      if (status) {
        setCookie('token', token, {
          res,
          req,
          maxAge: 2 * 30 * 24 * 60 * 60,
          httpOnly: true,
          secure: true,
        })
        res.status(201).json({ status: 'SUCCESS' })
      } else {
        res.status(200).json({
          message: lang
            ? 'ایمیل یا رمز عبور درستی نیست!'
            : '!Incorrect email or password',
          status: 'ERROR',
        })
      }
    } catch (error) {
      console.log(error)
      res.status(200).json({ status: 'ERROR', message: error })
    }
  } else res.send('req "' + req.method + '" is not defined')
}

export default Login
