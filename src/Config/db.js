const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "kidus@DB21!",
    host : "localhost",
    port: 5432,
    database: "notestutorial"
});


module.exports = pool;