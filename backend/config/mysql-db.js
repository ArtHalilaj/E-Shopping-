import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: "",
  database: process.env.MYSQL_DATABASE,
  port:4306
});

export default pool;
