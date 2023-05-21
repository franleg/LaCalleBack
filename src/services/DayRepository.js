import GenericRepository from "./GenericRepository.js";
import Day from "../models/Day.js";

export default class DayRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Day.model);
    }

    getByDate = (date) => {
        return this.getBy(date);
    }
}
