const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
const DB = process.env.DB;
const PASSWORD = process.env.PASSWORD;
const UNAME = process.env.UNAME;
const HOST = process.env.HOST;

module.exports = {
  "type": "mysql",
  "host": HOST,
  "port": 3306,
  "username": UNAME,
  "password": PASSWORD,
  "database": DB,
  "entities": [
    `${SOURCE_PATH}/**/**.entity{.ts,.js}`
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  "synchronize": false
}