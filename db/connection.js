const { Pool } = require('pg');

const pool = new Pool({
    user: 'Mikes', 
    host: 'localhost',
    database: 'employee_tracker',
    password: 'mock12!',
    port: 5432,
});

module.exports = pool;