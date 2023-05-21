import GenericRepository from "./GenericRepository.js";
import Field from "../models/Field.js";

export default class FieldRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Field.model);
    }
}