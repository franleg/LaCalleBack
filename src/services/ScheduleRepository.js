import GenericRepository from "./GenericRepository.js";
import Schedule from "../models/Schedule.js";

export default class ScheduleRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Schedule.model);
    }

    getById = (id) => {
        return this.getBy(id);
    }

    deleteById = (id) => {
        return this.deleteBy(id);
    }

    updateById = (id, schedule) => {
        return this.updateBy(id, schedule);
    }
}