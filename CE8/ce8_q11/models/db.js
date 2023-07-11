const mysql = require('mysql2')


let pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "pichu",
    database: "ce8q1",
    password: "Pokemon@123",
    connectionLimit: 10,
  })
  .promise();


async function cleanup() {
    await pool.end();
}

module.exports = {pool, cleanup};