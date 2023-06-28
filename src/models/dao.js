import mongoose from 'mongoose';
import Booking from './Booking.js';
import Day from './Day.js';
import Field from './Field.js';
import Schedule from './Schedule.js';
import User from './User.js';
import config from '../config/config.js';

export default class Dao {
    constructor() {
        this.connection = mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@codercluster.skwuuph.mongodb.net/${config.mongo.DB}?retryWrites=true&w=majority`, err => {
            if(err) console.log(err);
            else console.log('Connected to Atlas');
        })

        const timestamps = {
            timestamps: {
                createdAt: 'created_at', 
                updatedAt: 'updated_at'
            }
        }
        const bookingSchema = mongoose.Schema(Booking.schema, timestamps);
        const daySchema = mongoose.Schema(Day.schema, timestamps);
        const fieldSchema = mongoose.Schema(Field.schema, timestamps);
        const scheduleSchema = mongoose.Schema(Schedule.schema, timestamps);
        const userSchema = mongoose.Schema(User.schema, timestamps);

        this.models = {
            [Booking.model]: mongoose.model(Booking.model, bookingSchema),
            [Day.model]: mongoose.model(Day.model, daySchema),
            [Field.model]: mongoose.model(Field.model, fieldSchema),
            [Schedule.model]: mongoose.model(Schedule.model, scheduleSchema),
            [User.model]: mongoose.model(User.model, userSchema),
        }
    }

    getAll = (params, entity) => {
        if(!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].find(params).lean();
    }

    findOne = (params, entity) => {
        if(!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].findOne(params).lean();
    }

    save = (document, entity) => {
        if(!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].create(document);
    }

    delete = (params, entity) => {
        if(!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].deleteOne(params);
    }

    deleteAll = (params, entity) => {
        if(!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].deleteMany(params);
    }

    update = (params, document, entity) => {
        if(!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].findByIdAndUpdate(params, {$set: document});
    }
}
