import 'dotenv/config.js'

export const DEFAULT_CONFIG = {
  host: process.env.HOST,
  user: process.env.USERDB,
  port: process.env.PORTDB,
  password: process.env.PASSWORDDB,
  database: process.env.DATABASE
}
