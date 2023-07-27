import mongoose from "mongoose";

export default class Booking {
    static get model() {
        return 'bookings';
    }

    static get schema() {
        return {
            field: {
                type: String,
                enum: ['Cancha de 5', 'Cancha de 8'],
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            time: {
                start: {
                  type: String,
                  required: true,
                },
                end: {
                  type: String,
                  required: true,
                }
            },
            price : {
                type: Number,
                required: true
            },
            user: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'users',
                required: true
            },
            isReserved: {
                type: Boolean,
                default: false,
            },
            isFixed: {
                type: Boolean,
                default: false,
            }
        }   
    }
}