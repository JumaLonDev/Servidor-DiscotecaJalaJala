import express, { json } from 'express'
import { createMenuRouter } from './routes/menu.js'

export const createApp = ({ serverModel }) => {
  const app = express()

  app.use(json())
  app.disable('x-powered-by')

  app.use('/server', createMenuRouter({ serverModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
