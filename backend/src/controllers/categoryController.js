const categoryServices = require('../services/categoryServices');

module.exports = {
    getAllCategories : async (req, res) => {
        try {
            const categories = await categoryServices.getAllCategories();
            res.json(categories);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al obtener las categorias'})
        }
    },
    createCategory : async (req, res) => {
        try {
            const { nombre, descripcion } = req.body;
            const category = await categoryServices.createCategory({
                nombre,
                descripcion
            });
            res.json(category);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al crear la categoria'})
        }
    },
    getCategoryById : async (req, res) => {
        try {
            const { id } = req.params;
            const category = await categoryServices.getCategoryById(id);
            res.json(category);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al obtener la categoria'})
        }
    },
    updateCategoryById : async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;
            const category = await categoryServices.updateCategoryById(id, {
                nombre,
                descripcion
            });
            res.json(category);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al actualizar la categoria'})
        }
    },
    deleteCategoryById : async (req, res) => {
        try {
            const { id } = req.params;
            const category = await categoryServices.deleteCategoryById(id);
            res.json(category);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al eliminar la categoria'})
        }
    },
    getCategoriesByUserId : async (req, res) => {
        try {
            const { id } = req.params;
            const categories = await categoryServices.getCategoriesByUserId(id);
            res.json(categories);
        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error al obtener las categorias'})
        }
    }
}