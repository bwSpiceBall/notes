var express = require('express');
const pool = require('../sqlConnection');
var router = express.Router();

var app = express();

/* GET users listing. */
router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        const users = result.rows;
        client.release();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users from database');
    }
});

module.exports = router;