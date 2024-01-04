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


}