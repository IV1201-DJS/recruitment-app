'use strict'

const Env = use('Env')
const Helpers = use('Helpers')
const Url = require('url-parse')
const HEROKU_POSTGRES = new Url(Env.get('DATABASE_URL'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be good choice under development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true,
    debug: Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis')
    },
    debug: Env.get('DB_DEBUG', false)
  },


  /*
  |--------------------------------------------------------------------------
  | Legacy
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  legacy: {
    client: Env.get('LEGACY_DB_CLIENT', 'mysql'),
    connection: {
      host: Env.get('LEGACY_DB_HOST', 'localhost'),
      port: Env.get('LEGACY_DB_PORT', ''),
      user: Env.get('LEGACY_DB_USER', 'root'),
      password: Env.get('LEGACY_DB_PASSWORD', ''),
      database: Env.get('LEGACY_DB_DATABASE', 'adonis')
    },
    debug: Env.get('LEGACY_DB_DEBUG', false)
  },


  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', HEROKU_POSTGRES.host.split(":")[0]),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', HEROKU_POSTGRES.username),
      password: Env.get('DB_PASSWORD', HEROKU_POSTGRES.password),
      database: Env.get('DB_DATABASE', HEROKU_POSTGRES.pathname.substr(1))
    },
    debug: Env.get('DB_DEBUG', false)
  },

/*
  |--------------------------------------------------------------------------
  | MariaDB
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  maria: {
    client: 'mariasql',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      db: Env.get('DB_DATABASE', 'adonis')
    },
    debug: Env.get('DB_DEBUG', false)
  }
}
