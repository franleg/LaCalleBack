import GenericRepository from './GenericRepository.js';
import Booking from '../models/Booking.js';

export default class BookingRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Booking.model);
    }

    getByIdAndPopulate = (id) => {
        return this.getBy(id).populate('service');
    }

    getByDate = (service, date) => {
        return this.getBy({service, date:{ $gte: date, $lt: date + 1 }});
    }

    updateById = (id, booking) => {
        return this.updateBy(id, booking);
    }
}