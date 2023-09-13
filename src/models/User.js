import mongoose from 'mongoose';

export default class User {
    static get model() {
        return 'users';
    }
    
    static get schema() {
        return {
            first_name: String,
            last_name: String,
            address: String,
            phone: String,
            email: String,
            dni: Number,
            age: Number,
            password: String,
            role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
            },
            booking: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'bookings',
            }
        }
    }
}