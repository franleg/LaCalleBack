import { bookingService } from '../services/services.js';

const createReservation = async(req, res) => {
    try {
        const { courtType, datetime } = req.body;
        const existingReservation = await bookingService.getByDate(courtType, datetime);
        if (existingReservation) {
            res.status(400).send('La cancha ya esta reservada en esta fecha y hora');
        } else {
            const newReservation = {
                courtType,
                datetime,
                isReserved: true
            }
            await bookingService.save(newReservation);
            res.status(200).send(`Reserva creada con el ID: ${newReservation._id}`);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status:'Error al crear la reserva' });
    }
}

export default {
    createReservation
}