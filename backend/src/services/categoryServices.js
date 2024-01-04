const Category = require('../models/categoryModel');

module.exports = {
    getAllCategories : async (req, res) => {
        try {
            const categories = await Category.findAll();
            return categories;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al obtener las categorias' }
        }
    },
    createCategory : async (category) => {
        try {
            const newCategory = await Category.create(category);
            return newCategory;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al crear la categoria' }
        }
    },
    getCategoryById : async (id) => {
        try {
            const category = await Category.findByPk(id);
            return category;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al obtener la categoria' }
        }
    },
    updateCategoryById : async (id, category) => {
        try {
            const categoryToUpdate = await Category.findByPk(id);
            await categoryToUpdate.update(category);
            return categoryToUpdate;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al actualizar la categoria' }
        }
    },
    deleteCategoryById : async (id) => {
        try {
            const categoryToDelete = await Category.findByPk(id);
            await categoryToDelete.destroy();
            return categoryToDelete;
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error al eliminar la categoria' }
        }
    }
}

