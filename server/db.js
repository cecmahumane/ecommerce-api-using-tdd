const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  host: process.env.DATABASE_URL,
  port: process.env.DBPORT,
  database: process.env.DATABASE,
});

module.exports = pool;
