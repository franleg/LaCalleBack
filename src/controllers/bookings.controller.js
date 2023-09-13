import { bookingService } from '../services/services.js';
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const createReservation = async(req, res) => {
  console.log(req.pendingReservationData)
  try {
    if (req.paymentApproved) {
      const { token, field, date, time, price } = req.pendingReservationData;
  
      let user;
      try {
        user = jwt.verify(token, config.jwt.SECRET);
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return res.status(401).send({ error: "Token expired" });
        }
        throw error;
      }

      const existingReservations = await bookingService.getReservationsByDate(date);

      const isField8Occupied = existingReservations.find(reservation =>
        reservation.field === 'Cancha de 8' && reservation.time.start === time
      );

      const field5OccupiedCount = existingReservations.filter(reservation =>
        reservation.field === 'Cancha de 5' && reservation.time.start === time.start
      ).length;

      const areField5Occupied = field5OccupiedCount >= 1 && field5OccupiedCount <= 3;

      if ((field === 'Cancha de 8' && !isField8Occupied && !areField5Occupied) ||
          (field === 'Cancha de 5' && !isField8Occupied && field5OccupiedCount < 3)){
        const newReservation = {
          field,
          date,
          time,
          price,
          user: user.id,
          isReserved: true,
          isFixed: false
        };

        const result = await bookingService.save(newReservation);
        console.log('La reserva se ha creado con éxito!')
        res.status(200).send({ status: 'success', payload: result });
      } else {
        res.status(409).send({ error: "No se puede realizar la reserva en esa fecha y horario" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 'error', error: 'Error al crear la reserva' });
  }
};

export default {
  createReservation
};
