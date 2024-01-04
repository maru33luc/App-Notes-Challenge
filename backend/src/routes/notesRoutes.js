const express = require('express');
const { getAllNotes, createNote, updateNoteById, deleteNoteById} = require('../controllers/noteController');
const router = express.Router();

router.get('/', getAllNotes);
router.post('/', createNote);
router.put('/:id', updateNoteById);
router.delete('/:id', deleteNoteById);


module.exports = router;

