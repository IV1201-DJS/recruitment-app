require("dotenv").config()
import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import * as mongoose from "mongoose"

import routes from './api/index';

const main = async (ENV: any) => {
  const {
    DB_USER = '',
    DB_PASS = '',
    DB_NAME = 'database',
    DB_HOST = 'localhost',
    DB_PORT = '27017',
    PORT = 3000
  } = ENV;

  // Init db connection
  mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/`);

  // Init express
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cors())

  // Register api routes
  app.use('/api/', routes)

  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
}

main(process.env)
