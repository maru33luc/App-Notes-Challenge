const express = require('express');
const { getAllNotes, createNote, updateNoteById, 
    deleteNoteById, getNoteById, getNotesByStatus,updateStatusNoteById,
    } = require('../controllers/noteController');
const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNoteById);
router.patch('/:id', updateStatusNoteById);
router.delete('/:id', deleteNoteById);
router.get ('/status/:status', getNotesByStatus);



module.exports = router;

