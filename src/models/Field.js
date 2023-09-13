export default class Field {
    static get model() {
        return 'fields';
    }

    static get schema() {
        return {
            name: {
                type: String,
                enum: ['Cancha de 5', 'Cancha de 8'],
                required: true,
            },
            price: {
                type: Number,
                required: true
            }
        }
    }
}