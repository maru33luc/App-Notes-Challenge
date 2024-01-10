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
            const { title, content, usuarioId, categoriaId } = req.body;
            const note = await noteServices.createNote({
                title,
                content,
                usuarioId,
                categoriaId
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
            const { title, content, categoriaId } = req.body;
            const note = await noteServices.updateNoteById(id, {
                title,
                content,
                categoriaId
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
    getNotesByStatus : async (req, res) => {
        try {
            const { status } = req.params;
            const notes = await noteServices.getNotesByStatus(status);
            res.json(notes);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al obtener las notas'})
        }
    },
    getNotesByIdByStatus : async (req, res) => {
        try {
            const { id, status } = req.params;
            const notes = await noteServices.getNotesByIdByStatus(id, status);
            console.log('NOTES-------------',notes);
            res.json(notes);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al obtener las notas'})
        }
    },

    updateStatusNoteById : async (req, res) => {
        try {
            const { id } = req.params;
            const { activa } = req.body;
            const note = await noteServices.updateStatusNoteById(id, {
                activa
            });
            res.json(note);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al actualizar la nota'})
        }
    }
    
}