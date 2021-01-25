import {createConnection, getConnectionOptions, ConnectionOptions} from "typeorm";
import { Server } from 'typescript-rest'
import { Item } from "./src/entities/Item";
import { ItemService } from './src/services/ItemService'

import express from 'express'

const app:express.Application = express()
const port = 3000

try {
  console.debug('Starting backend...')

  app.get('/', (req:any, res:any) => {
    res.send('Hola')
  })
  
  getConnectionOptions()
  .then((connectionOptions: ConnectionOptions) => {
    Object.assign(connectionOptions, { type: 'mysql' })
    Object.assign(connectionOptions, { host: 'localhost' })
    Object.assign(connectionOptions, { port: 3306 })
    Object.assign(connectionOptions, { username: 'root' })
    Object.assign(connectionOptions, { password: 'root' })
    Object.assign(connectionOptions, { database: 'homeht' })
    Object.assign(connectionOptions, { entities: [Item, '/entity/*{.ts}'] })
    // create connection with database
    createConnection(connectionOptions)
      .then(async (connection) => {
        await connection.synchronize();
        console.log('Connected to database', connection.driver.database)
      })
      .catch((error) => {
        console.error('TypeORM connection error: ', error)
      })
  })
  .catch((error) => {
    console.error('Unable to set connection options: ', error)
  })

  app.listen(port, () => {
    console.log(`Example http://localhost:${port}`)
  })

  // build REST services
  Server.buildServices(app, ...[ItemService])

} catch (error) {
  console.error(`Something happened: ${error}`)
}