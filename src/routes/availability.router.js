import { Router } from 'express';
import availabilityController from '../controllers/availability.controller.js';

const router = Router();

// GET AVAILABLE SCHEDULES
router.get('/', availabilityController.getSchedules);

export default router;