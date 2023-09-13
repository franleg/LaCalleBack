import { userService } from '../services/services.js';

const getUsers = async (req, res) => {
    try {
        let users = await userService.getUsers();
        res.send({status: 'success', payload: users});
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "error", error: "Internal error", trace: error}); 
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await userService.getByEmail(email);
        if (!user) return res.status(404).send({status: 'error', error: 'Usuario no encontrado'})
        res.send({status: 'success', payload: user});
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "error", error: "Internal error", trace: error});
    }
}

export default {
    getUsers,
    getUserByEmail,
}