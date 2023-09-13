import express from "express";
import cors from 'cors';
import passport from "passport";
import initializePassport from './config/passport.config.js';
import cookieParser from "cookie-parser";
import BookingsRouter from './routes/bookings.router.js';
import SessionsRouter from './routes/sessions.router.js';
import AvailabilityRouter from './routes/availability.router.js'
import PromotionsRouter from './routes/promotions.router.js';
import UsersRouter from './routes/users.router.js';
import mercadopagoRouter from './routes/mercadoPago.router.js';
import config from "./config/config.js";
// import mercadopago from "mercadopago";
// import axios from "axios";

const app = express();

const PORT = config.app.PORT;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use('/api/booking', BookingsRouter);
app.use('/api/sessions', SessionsRouter);
app.use('/api/availability', AvailabilityRouter);
app.use('/api/promotions', PromotionsRouter);
app.use('/api/users', UsersRouter);
app.use('/api/mercadoPago', mercadopagoRouter);

// const accessToken = 'TEST-2184574495365681-072418-acf3a592a00d248bf090ae5cbeeaee79-1431581311';

// mercadopago.configurations.setAccessToken(`${accessToken}`);

// app.post('/create_preference', async (req, res) => {
//   try {
//     const preferenceData = {
//       items: [
//         {
//           title: 'Mi producto',
//           quantity: 1,
//           unit_price: 75.56,
//         },
//       ],
//     };

//     const preference = await mercadopago.preferences.create(preferenceData);
//     const preferenceId = preference.body.id;

//     res.json({ preference_id: preferenceId });
//   } catch (error) {
//     console.error('Error al crear la preferencia:', error.message);
//     res.status(500).json({ error: 'Error al crear la preferencia' });
//   }
// });

// app.post('/webhook', async(req, res) => {
//   try {
//     const notificationData = req.body;

//     switch (notificationData.type) {
//       case 'payment':
//         console.log('Evento de pago recibido:', notificationData);
//         const paymentId = notificationData.data.id;
//         const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         const paymentInfo = response.data;
//         if (paymentInfo.status === 'approved') {
//           console.log('El pago ha sido aprobado. ID del pago:', paymentInfo.id);
//         }
//         break;
//       default:
//         console.log('Evento no procesado:', notificationData);
//     }
//     res.status(200).send('Notificación recibida y procesada correctamente.');
//   } catch (error) {
//     console.error('Error al procesar la notificación:', error.message);
//     res.status(500).send('Error al procesar la notificación.');
//   }
// });
