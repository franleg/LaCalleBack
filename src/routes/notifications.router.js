import { Router } from 'express';
import notificationsController from '../controllers/notificationsController.js';

const router = Router();

router.post('/', notificationsController.notificate);

export default router;