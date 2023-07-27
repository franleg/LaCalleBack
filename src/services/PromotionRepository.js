import GenericRepository from './GenericRepository.js';
import Promotion from '../models/Promotion.js';

export default class PromotionRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Promotion.model);
    };

    getById = (id) => {
        return this.getBy({ id });
    }

    getByDay = (day) => {
        return this.getBy({ 'days.day': day });
    }

    updateById = (id, promotion) => {
        return this.updateBy({ _id: id }, promotion);
    }

    deleteById = (id) => {
        return this.deleteBy({ _id: id });
    }

    deleteAll = () => {
        return this.deleteAll({});
    }
}