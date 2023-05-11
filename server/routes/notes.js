const express = require('express');
const router = express.Router();
const pool = require('../sqlConnection');


function isAuthenticated(req, res, next) {

    console.log('req.user', req);
    if (req.user && req.user.isAuthenticated) {
        return next();
    } else {
        return res.sendStatus(401);
    }
}


router.get('/', async (req, res) => {

    // console.log('isAuthenticated', isAuthenticated());
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM notes');
        const notes = result.rows;
        client.release();
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


router.post('/', async (req, res) => {
    const { user_id, note_text, title } = req.body;

    if (!title.trim() || !note_text.trim()) {
        return res.status(400).json({ message: 'Title and Text cannot be empty' });
    }

    try {
        const client = await pool.connect();
        const result = await client.query(
            `INSERT INTO notes (user_id, note_text, title) VALUES ($1, $2, $3) RETURNING *`,
            [user_id, note_text, title]
        );
        const newNote = result.rows[0];
        client.release();
        res.json(newNote);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Delete a note by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
        const deletedNote = result.rows[0];
        client.release();
        res.json(deletedNote);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', (req, res) => {
    // handle deleting a note with the given ID
});

module.exports = router;
