import { Router } from 'express';
import bookingsController from '../controllers/bookings.controller.js';
//import verifyMercadoPago from '../middlewares/verifyMercadoPago.js';

const router = Router();

// CREATE NEW RESERVATION
router.post('/', bookingsController.createReservation);

export default router;