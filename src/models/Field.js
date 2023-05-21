import mongoose from "mongoose";

export default class Field {
    static get model() {
        return 'fields';
    }

    static get schema() {
        return {
            title: String,
            price: Number,
            description: String,
        }
    }
}