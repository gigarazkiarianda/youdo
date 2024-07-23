const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'youdo',
    connectionLimit: 10
});

const promisePool = pool.promise();

module.exports = promisePool;
