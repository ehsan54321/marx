import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) reject(err)

      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(err)
        resolve(hash)
      })
    })
  })
}

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword)
}

const createToken = (token) => {
  return jwt.sign(token, process.env.JWT_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '60d',
  })
}

export { hashPassword, verifyPassword, createToken }
