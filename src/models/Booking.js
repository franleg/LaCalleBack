import mongoose from "mongoose";

export default class Booking {
    static get model() {
        return 'bookings';
    }

    static get schema() {
        return {
            service: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'services'
            },
            day: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'days'
            },
            schedule: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'schedules'
            }
        }   
    }
}