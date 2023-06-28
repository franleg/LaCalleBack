import mongoose from "mongoose";

export default class Booking {
    static get model() {
        return 'bookings';
    }

    static get schema() {
        return {
            service: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'services',
                required: true
            },
            datetime: {
                type: Date,
                required: true
            },
            user: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'users'
            }
        }   
    }
}