import { Router } from 'express'

export const createMenuRouter = ({ menuModel }) => {
  const menuRouter = Router()

  menuRouter.get('/', (res) => {
    res.json('Hola mundo')
  })
}
