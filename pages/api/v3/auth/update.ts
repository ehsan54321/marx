import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { putUserData } from '@/server/controller/User'

const Update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const { token, status, message } = await putUserData(req.body)

    if (status === 'SUCCESS') {
      setCookie('token', token, {
        res,
        req,
        maxAge: 2 * 30 * 24 * 60 * 60,
        httpOnly: true,
        secure: true,
      })
      res.status(200).json({ status: 'SUCCESS' })
    } else {
      res.status(200).json({ status, message })
    }
  } else res.send('req "' + req.method + '" is not defined')
}

export default Update
