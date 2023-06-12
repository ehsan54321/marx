import AllUser from '@/util/db/user.json'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

const NewUser = (req: NextApiRequest, res: NextApiResponse) => {
  const users = JSON.stringify({ user: { ...AllUser.user, ...req.body.data } })

  if (!AllUser.user[req.body.email]) {
    fs.writeFile('util/db/user.json', users, (err) => {
      if (err) {
        console.log(err)
        res.status(200).json({ status: 'ERROR' })
      } else res.status(201).json({ status: 'SUCCESS' })
    })
  } else {
    res.status(200).json({
      status: 'ERROR',
      message: 'این ایمیل قبلا انتخاب شده است! از ایمیل دیگری استفاده کنید.',
    })
  }
}

export default NewUser
