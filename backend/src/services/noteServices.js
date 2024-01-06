const Note = require('../models/noteModel');

module.exports = {
    getAllNotes : async (req, res) => {
        try {
            const notes = await Note.findAll();
            return notes;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al obtener las notas' }
        }
    },
    createNote : async (note) => {
        try {
            const newNote = await Note.create(note);
            return newNote;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al crear la nota' }
        }
    },
    getNoteById : async (id) => {
        try {
            const note = await Note.findByPk(id);
            return note;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al obtener la nota' }
        }
    },
    updateNoteById : async (id, note) => {
        try {
            const noteToUpdate = await Note.findByPk(id);
            await noteToUpdate.update(note);
            return noteToUpdate;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al actualizar la nota' }
        }
    },
    getNotesByStatus : async (status) => {
        try {
            const notes = await Note.findAll({
                where: {
                    activa: status
                }
            });
            return notes;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al obtener las notas' }
        }
    },
    getNotesByIdByStatus : async (id, status) => {
        try {
            const notes = await Note.findAll({
                where: {
                    usuarioId: id,
                    activa: status
                }
            });
            return notes;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al obtener las notas' }
        }
    },
    deleteNoteById : async (id) => {
        try {
            const noteToDelete = await Note.findByPk(id);
            await noteToDelete.destroy();
            return noteToDelete;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al eliminar la nota' }
        }
    },
    updateStatusNoteById : async (id, status) => {
        try {
            const noteToUpdate = await Note.findByPk(id);
            await noteToUpdate.update(status);
            return noteToUpdate;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al actualizar la nota' }
        }
    },
   
}