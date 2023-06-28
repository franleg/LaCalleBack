import { bookingService } from '../services/services.js';

const getSchedules = async (req, res) => {
  try {
    const { tipoCancha, fecha } = req.query;
    const selectedDate = new Date(fecha);
    const dayOfWeek = selectedDate.getDay();
    const startTime = dayOfWeek === 0 || dayOfWeek === 6 ? 15 : 16;
    const endTime = dayOfWeek === 0 || dayOfWeek === 6 ? 22 : 23;
    const existingReservations = await bookingService.getByDate(tipoCancha, selectedDate);
    const reservedHours = existingReservations.map(reservation => reservation.datetime.getHours());
    const availableHours = [];
    for (let hour = startTime; hour <= endTime; hour++) {
      if (!reservedHours.includes(hour)) {
        availableHours.push(`${hour}:00`);
      }
    }
    res.status(200).send({ tipoCancha, fecha, horariosDisponibles: availableHours });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'Error al obtener los horarios disponibles' });
  }
};

export default {
  getSchedules
};
