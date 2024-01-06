const session = require('express-session');
const userServices = require('../services/userServices');

module.exports = {
    getAllUsers: async(req, res) => {
        try{
            const users = await userServices.getAllUsers();
            res.json(users);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    getUserById: async (req, res) => {
        try{
            const user = await userServices.getUserById(req.params.id);
            res.json(user);
        }
        catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    addUser: async (req, res) => {
        try{
            const user = await userServices.addUser(req.body);
            console.log('user en en controller', user);
            res.json(user);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    updateUser: async (req, res) => {
        try{
            const user = await userServices.updateUser(req.params.id, req.body);
            res.json(user);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    deleteUser: async (req, res) => {
        try{
            const user = await userServices.deleteUser(req.params.id);
            res.json(user);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    authUser : async (req, res) => {
        try{
            const correo = req.body.correo;
            const contraseñaHash = req.body.contraseñaHash;
            const user = await userServices.getUserByEmailAndPassword(correo, contraseñaHash);
        //    establecer una cookie de sesion
            req.session.user = user;
            req.session.auth = true;
            res.cookie('user', user, { httpOnly: true, secure: true });
            res.json(user);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    isLoggedIn : (req, res) => {
        if(req.session.user){
            console.log('req.session.user', req.session.user);
            res.json(req.session.user);
        }else{
            res.json({error: 'No autorizado'});
            console.log('No autorizado');
        }
    },
    logout : (req, res) => {
        req.session.destroy();
        // eliminar cookie del navegador
        res.clearCookie('user');
        res.json({message: 'Sesion cerrada'});
    }
}