import GenericRepository from './GenericRepository.js';
import Booking from '../models/Booking.js';

export default class BookingRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Booking.model);
    }

    getByIdAndPopulate = (id) => {
        return this.getBy(id).populate('service');
    }

    updateById = (id, cart) => {
        return this.updateBy(id, cart);
    }
}