import { Router } from 'express';
import schedulesController from '../controllers/schedules.controller.js';

const router = Router();

// ADD SCHEDULE
router.post('/', schedulesController.createSchedule);

// DELETE SCHEDULE BY ID
router.delete('/:idSchedule', schedulesController.deleteSchedule);

// DELETE ALL SCHEDULES
router.delete('/', schedulesController.deleteAllSchedules);

// GET ALL SCHEDULES
router.get('/', schedulesController.getAllSchedules);

export default router;