import { Router } from 'express';
import mercadoPagoController from '../controllers/mercadopago.controller.js';
import bookingsController from '../controllers/bookings.controller.js';

const router = Router();

router.post('/createPreference', mercadoPagoController.createPreference);

router.post('/webhook', mercadoPagoController.verifyPayment, bookingsController.createReservation);

export default router;