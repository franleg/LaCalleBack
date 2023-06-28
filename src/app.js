import express from "express";
import cors from 'cors';
import passport from "passport";
import initializePassport from './config/passport.config.js';
import cookieParser from "cookie-parser";
import BookingsRouter from './routes/bookings.router.js';
import SessionsRouter from './routes/sessions.router.js';
import AvailabilityRouter from './routes/availability.router.js'
import UsersRouter from './routes/users.router.js';
import config from "./config/config.js";

const app = express();

const PORT = config.app.PORT;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use('/api/bookings', BookingsRouter);
app.use('/api/sessions', SessionsRouter);
app.use('/api/availability', AvailabilityRouter);
app.use('/api/users', UsersRouter);
