const { Pool } = require('pg');

const pool = new Pool({
    user: 'tszpak',
    host: 'localhost',
    database: 'postgres',
    password: 'Hapy',
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err);
    } else {
        console.log(
            `Connected to PostgreSQL database at ${pool.options.host}:${pool.options.port}`
        );
    }
});

module.exports = pool;