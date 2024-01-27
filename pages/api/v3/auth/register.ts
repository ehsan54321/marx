<<<<<<< HEAD
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreateUser } from '@/server/controller/User'
import { setCookie } from 'cookies-next'

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { status, token, message } = await CreateUser({ ...req.body })
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
      res.status(200).json({ status: 'ERROR', message })
    }
  } else res.send('req "' + req.method + '" is not defined')
}

export default Register
=======
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreateUser } from '@/server/controller/User'
import { setCookie } from 'cookies-next'

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { status, token, message } = await CreateUser({ ...req.body })
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
      res.status(200).json({ status: 'ERROR', message })
    }
  } else res.send('req "' + req.method + '" is not defined')
}

export default Register
>>>>>>> 1bd3d58 (start git)
