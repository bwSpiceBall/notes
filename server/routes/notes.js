const express = require('express');
const router = express.Router();
const pool = require('../sqlConnection');


function isAuthenticated(req, res, next) {
        console.log('req.session.passport', req.session.passport);
    if (req.session.passport.user) {
        return next();
    } else {
        return res.sendStatus(401);
    }
}


router.get('/', isAuthenticated, async (req, res) => {

    const userId = req.session.passport.user.id;
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM notes WHERE user_id = ${userId}`);
        const notes = result.rows;
        client.release();
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


router.post('/', async (req, res) => {
    const { note_text, title } = req.body;
    const user_id = req.session.passport.user.id;
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
