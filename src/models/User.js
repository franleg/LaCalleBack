import mongoose from 'mongoose';

export default class User {
    static get model() {
        return 'users';
    }
    
    static get schema() {
        return {
            first_name: String,
            last_name: String,
            age: Number,
            adress: String,
            phone: String,
            email: String,
            password: String,
            avatar: String,
            role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
            },
            cart: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'carts',
            }
        }
    }
}