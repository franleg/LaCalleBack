import { Router } from 'express';
import availabilityController from '../controllers/availability.controller.js';

const router = Router();

// GET SCHEDULES AT DAY
router.post('/', availabilityController.addSchedulesAtDay);

export default router;