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
            req.session.user = user;
            req.session.auth = true;
            res.cookie('user', user, { httpOnly: false, secure: false });
            res.json(user);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    isLoggedIn : (req, res) => {
        if(req.cookies.user){
            console.log('req.cookies.user', req.cookies.user);
            res.json(req.cookies.user);
        }else{
            res.json({error: 'No autorizado'});
            console.log('No autorizado');
        }
    },
    logout : (req, res) => {
        req.session.destroy();
        res.clearCookie('user');
        res.json({message: 'Sesion cerrada'});
    }
}