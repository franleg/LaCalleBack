import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

// GET USER BY EMAIL
router.get('/', usersController.getUserByEmail);

export default router;