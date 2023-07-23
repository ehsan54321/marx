import {
  hashPassword,
  verifyPassword,
  createToken,
} from '@/server/middleware/authentication'
import PersianDate from 'persian-date'
import connectMongo from '@/util/connectMongo'
import User from '@/server/models/user'

const CreateUser = async ({ username, password, email }) => {
  try {
    await connectMongo()
    const checkExistingUser = await User.find({ email })

    if (checkExistingUser.length > 0) {
      return { message: 'ایمیل وارد شده تکراری است!', status: false }
    } else {
      const newPassword = await hashPassword(password)
      const dataOBJ = {
        username,
        email,
        password: newPassword,
        created: new PersianDate().toLocale('en').format('YYYY/MM/DD'),
      }

      const { id } = await User.create(dataOBJ)

      const dataOBJClint = {
        ...dataOBJ,
        password: undefined,
        id,
      }

      return { status: true, token: createToken(dataOBJClint) }
    }
  } catch (error) {
    console.log(error)
    return { status: false, message: error }
  }
}

const UserAuthentication = async ({ email, password }) => {
  await connectMongo()
  const checkExistingUser = await User.findOne({ email })

  if (!checkExistingUser) return { status: false }
  else {
    const hashPassword = checkExistingUser.password
    const checkPassword = await verifyPassword(password, hashPassword)

    if (!checkPassword) return { status: false }
    else {
      const { username, created, id } = checkExistingUser
      const token = await createToken({ email, username, created, id })

      return { token, status: true }
    }
  }
}

const putUserData = async (user) => {
  await connectMongo()
  const findUser = await User.findOne({ email: user.email })
  const token = {
    email: user.email,
    username: user.username,
    created: user.created,
    id: findUser._id,
  }
  if (!findUser) return { status: 'ERROR' }
  if (user.password !== '') {
    const checkPassword = await verifyPassword(user.password, findUser.password)
    if (!checkPassword)
      return { status: 'ERROR', message: 'رمز عبور قدمی صحیح نمی باشد!' }
    const new_password = await hashPassword(user.newPassword)
    await User.findByIdAndUpdate(findUser._id, {
      username: user.username,
      password: new_password,
    })
    return { status: 'SUCCESS', token: createToken(token) }
  }
  await User.findByIdAndUpdate(findUser._id, { username: user.username })
  return { status: 'SUCCESS', token: createToken(token) }
}

// const UsersCount = async () => {
//   const usersCount = await User.countDocuments()

//   return usersCount
// }

// const getUsers = async (params) => {
//   const usersCount = await UsersCount()
//   const page = parseInt(params.page)
//   const pageSize = parseInt(params.pageSize)
//   const users = await User.find({})
//     .limit(pageSize)
//     .skip(page === 1 ? 0 : (page - 1) * pageSize)

//   return { users, count: usersCount }
// }

// const getUserId = async (value) => {
//   const userId = (await User.findOne(value))._id

//   return userId
// }

export {
  CreateUser,
  UserAuthentication,
  putUserData,
  // UsersCount,
  // getUsers,
  // putUser,
  // getUserId,
}
