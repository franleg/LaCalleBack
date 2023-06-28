export default class Field {
    static get model() {
        return 'fields';
    }

    static get schema() {
        return {
            type: {
                type: String,
                enum: ['Cancha de 5', 'Cancha de 8'],
            },
            price: Number,
            description: String,
        }
    }
}