import { Router } from 'express';
import passport from 'passport';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

// REGISTER
router.post('/register', (req, res, next) => {
    passport.authenticate('register', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            const errorMessage = (info && info.message) || 'Error de autenticación';
            return res.status(401).send({ status: 'error', error: errorMessage });
        }
        sessionsController.register(req, res);
    })(req, res, next);
});

// LOGIN
router.post('/login', (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            const errorMessage = (info && info.message) || 'Error de autenticación';
            return res.status(401).send({ status: 'error', error: errorMessage });
        }
        req.logIn(user, { session: false }, (err) => {
            if(err) {
                return next(err);
            }
            sessionsController.login(req, res);
        });
    })(req, res, next);
});

// CURRENT
router.get('/current', sessionsController.login);

export default router;

