export default class GenericRepository {
    constructor(dao, model) {
        this.dao = dao;
        this.model = model;
    }

    getAll = (params) => {
        return this.dao.getAll(params, this.model);
    }

    getBy = (params) => {
        return this.dao.findOne(params, this.model);
    }

    save = (data) => {
        return this.dao.save(data, this.model);
    }

    deleteBy = (params) => {
        return this.dao.delete(params, this.model);
    }

    deleteAll = (data) => {
        return this.dao.deleteAll(data, this.model);
    }

    updateBy = (params, data) => {
        return this.dao.update(params, data, this.model);
    }
}