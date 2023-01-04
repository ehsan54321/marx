import AllUser from '@util/db/user.json'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

const UpdateUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email } = req.body
  const token = {
    [email]: {
      email,
      username,
      date: AllUser.user[email].date,
      password: AllUser.user[email].password,
    },
  }
  const users = JSON.stringify({ user: { ...AllUser.user, ...token } })
  if (AllUser.user[req.body.email]) {
    fs.writeFile('util/db/user.json', users, (err) => {
      if (err) {
        console.log(err)
        res.status(200).json({ status: 'ERROR' })
      } else res.status(201).json({ status: 'SUCCESS' })
    })
  } else {
    res.status(200).json({ status: 'ERROR' })
  }
}

export default UpdateUser
