import bcrypt from 'bcrypt'

const saltRound = process.env.SALT ? +process.env.SALT : 10

export const hash = (password: string) => {
  const SALT = bcrypt.genSaltSync(saltRound)
  const hashed = bcrypt.hashSync(password, SALT)
  return hashed
}