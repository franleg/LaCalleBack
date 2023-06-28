import mongoose from "mongoose";

export default class Schedule {
    static get model() {
        return 'schedules';
    }

    static get schema() {
        return {
            field: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'fields',
            },
            start: {
                type: String,
                required: true
            },
            end: {
                type: String,
                required: true
            },
            isAvailable: {
                type:Boolean,
                default: true
            }
        }
    }
}