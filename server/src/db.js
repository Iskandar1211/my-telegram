const Pool = require('pg').Pool
const pool = new Pool({
    user:'postgres',
    password:'mehrona',
    host:'localhost',
    port:'5432',
    database:'telegram'
});

module.exports = pool