import { dayService } from '../services/services.js';
import { scheduleService } from '../services/services.js';

const addSchedulesAtDay = async (req, res) => {
    try {
        console.log(req.body);
        const dateTime = new Date(req.body.date);
        const date = await dayService.getByDate(dateTime);
        const schedules = await scheduleService.getAll();
        if (!date) {
            const day = new Date({
                date: dateTime,
                schedules: schedules
            })
            await dayService.save(day);
            res.status(200).send({status: 'success', payload: day});
        } else {
            res.status(200).send({status: 'success', payload: date});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "error", error: "Internal error", trace: error});         
    }
}

export default {
    addSchedulesAtDay
}