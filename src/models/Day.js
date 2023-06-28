import mongoose from "mongoose";

export default class Day {
    static get model() {
        return 'days';
    }

    static get schema() {
        return {
            date: Date,
            schedules: [
                {
                    schedule: {
                        type: mongoose.SchemaTypes.ObjectId,
                        ref: 'schedules'
                    }
                }
            ],
            field: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'fields',
            }
        }
    }
}