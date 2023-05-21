export default class Schedule {
    static get model() {
        return 'schedules';
    }

    static get schema() {
        return {
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