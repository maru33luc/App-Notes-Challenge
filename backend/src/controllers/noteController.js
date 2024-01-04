const noteServices = require('../services/noteServices');

module.exports = {
    getAllNotes : async (req, res) => {
        try {
            const notes = await noteServices.getAllNotes();
            res.json(notes);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al obtener las notas'})
        }
    },
    createNote : async (req, res) => {
        try {
            const { title, content } = req.body;
            const note = await noteServices.createNote({
                title,
                content
            });
            res.json(note);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al crear la nota'})
        }
    },
    getNoteById : async (req, res) => {
        try {
            const { id } = req.params;
            const note = await noteServices.getNoteById(id);
            res.json(note);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al obtener la nota'})
        }
    },
    updateNoteById : async (req, res) => {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const note = await noteServices.updateNoteById(id, {
                title,
                content
            });
            res.json(note);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al actualizar la nota'})
        }
    },
    deleteNoteById : async (req, res) => {
        try {
            const { id } = req.params;
            const note = await noteServices.deleteNoteById(id);
            res.json(note);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al eliminar la nota'})
        }
    },
    getNotesByUserId : async (req, res) => {
        try {
            const { id } = req.params;
            const notes = await noteServices.getNotesByUserId(id);
            res.json(notes);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al obtener las notas'})
        }
    },
    getNotesByCategoryId : async (req, res) => {
        try {
            const { id } = req.params;
            const notes = await noteServices.getNotesByCategoryId(id);
            res.json(notes);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al obtener las notas'})
        }
    },






}