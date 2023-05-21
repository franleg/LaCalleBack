import express from "express";
import cors from 'cors';
import CartsRouter from './routes/carts.router.js';
import ServicesRouter from './routes/services.router.js';
import SessionsRouter from './routes/sessions.router.js';
import SchedulesRouter from './routes/schedules.router.js';
import AvailabilityRouter from './routes/availability.router.js'
import UsersRouter from './routes/users.router.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(8080, () => console.log(`Listening on ${PORT}`));

app.use(express.json());
app.use(cors());

app.use('/api/carts', CartsRouter);
app.use('/api/services', ServicesRouter);
app.use('/api/sessions', SessionsRouter);
app.use('/api/schedules', SchedulesRouter);
app.use('/api/availability', AvailabilityRouter);
app.use('/api/users', UsersRouter);
