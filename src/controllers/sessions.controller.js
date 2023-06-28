import config from "../config/config.js";
import jwt from "jsonwebtoken";

const register = (req, res) => {
    try {
        let user = req.user;
        res.status(200).send({status: 'success', payload: user});
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "error", error: "Internal error", trace: error});
    }
}

const login = (req, res) => {
    try {    
        console.log(req.user)
        const loginUser = {
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            phone: req.user.phone,
            adress: req.user.address,
            age: req.user.age,
            dni: req.user.dni,
            booking: req.user.booking,
            role: req.user.role
        }

        const token = jwt.sign(loginUser, config.jwt.SECRET, {expiresIn: 120});

        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 2);

        res.cookie(config.jwt.COOKIE, token, {maxAge: 120000, httpOnly: true}).send({
            status:"success", 
            payload: loginUser, token,
            expiresAt: expirationDate
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({status: "error", error: "Internal error", trace: error});
    }
}

const current = async(req, res) => {
    try {
        const token = req.cookies[config.jwt.COOKIE];
        if(!token) return res.redirect('/login');
        /* if(!token) return res.send({status: "error", error: "La sesión expiró"}); */
        const user = jwt.verify(token,config.jwt.SECRET);
        res.send({status: "success", user});
    } catch (error) {
        if(error.expiresAt) return res.send({status: "error", error: "Token expirado"});
    }
}

export default {
    register,
    login,
    current
}