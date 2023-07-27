import GenericRepository from './GenericRepository.js';
import Booking from '../models/Booking.js';

export default class BookingRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Booking.model);
    }

    getReservationByTime= (field, date, time) => {
        return this.getBy({field, date, time});
    }

    getReservationsByDate= (date) => {
        return this.getAll({date});
    }

    getReservations = (field, date) => {
        return this.getAll({ field, date });
    }

    getFixedReservations(field, date) {
        return this.getAll({ field, date, isFixed: true });
      }

    updateById = (id, booking) => {
        return this.updateBy(id, booking);
    }
}