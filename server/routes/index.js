const express = require('express');
const notesRouter = require('./notes');
const authRouter = require('./auth');

const router = express.Router();

router.use('/notes', notesRouter);
router.use('/auth', authRouter);

module.exports = router;
