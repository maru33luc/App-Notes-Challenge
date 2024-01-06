const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    getAllUsers: async() => {
        try{
            const users = await UserModel.findAll();
            return users;
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    getUserById : async(id) => {
        try{
            const user = await UserModel.findByPk(id);
            return user;
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    addUser: async(newUser) => {
        try{
            newUser.contraseñaHash = bcrypt.hashSync(newUser.contraseñaHash, 10);
            const user = await UserModel.create(newUser);
            return user;
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    updateUser: async (id, updatedUser) => {
        try {
            const existingUser = await UserModel.findByPk(id);

            if (updatedUser.password && !bcrypt.compareSync(updatedUser.password, existingUser.password)) {
                updatedUser.password = bcrypt.hashSync(updatedUser.password, 10);
            }else {
                delete updatedUser.password;
            }

            await UserModel.update(updatedUser, {
                where: {
                    id: id,
                },
            });
            return { success: 'Se ha modificado el usuario' };
        } catch (error) {
            console.log(error);
            return { error: 'Ocurrió un error' };
        }
    },
    deleteUser: async(id) => {
        try{
            await UserModel.destroy({
                where: {
                    id: id
                }
            });
            return {success: 'Se ha eliminado el usuario'};
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    getUserByEmail: async(email) => {
        try{
            const user = await UserModel.findOne({
                where: {
                    email: email
                }
            });
            return user;
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    getUserByEmailAndPassword: async (email, password) => {
        try {
            const user = await UserModel.findOne({
                where: {
                    correo: email,
                },
            });

            if (user && bcrypt.compareSync(password, user.contraseñaHash)) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new Error('Ocurrió un error');
        }
    }
}