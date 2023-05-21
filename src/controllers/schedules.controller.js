import mongoose from 'mongoose';
import { scheduleService } from '../services/services.js';

const createSchedule = async (req, res) => {
    try {
        const { start, end } = req.body;
        if(!start || !end) return res.status(400).send({status: 'error', error: 'Valores incompletos'});
        const newSchedule = {
            start,
            end
        }
        let result = await scheduleService.save(newSchedule);
        res.status(200).send({status: 'success', payload: result});
    } catch(error) {
        console.log(error);
        res.status(500).send({status: "error", error: "Internal error", trace: error});
    } 
}

const deleteSchedule = async (req, res) => {
    try {
        let id = req.params.idSchedule;
        if(!id) return res.status(400).send({status: 'error', error: 'El id del horario es requerido'});
        if(id.length !== 24) return res.status(400).send({status: 'error', error: `Formato de id incorrecto`}); 
        let scheduleObjectId = mongoose.Types.ObjectId(id);
        let schedule = await scheduleService.getById(scheduleObjectId);
        if(!schedule) return res.status(400).send({status: 'error', error: `No se ha encontrado el horario con id ${id}`});
        await scheduleService.deleteById(scheduleObjectId);
        let schedules = await scheduleService.getAll();
        res.status(200).send({status: 'success', payload: schedules});
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "error", error: "Internal error", trace: error});
    }
}

const deleteAllSchedules = async (req, res) => {
    try {
        const schedules = await scheduleService.deleteAll();
        res.status(200).send({status: 'success', payload: schedules});
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "error", error: "Internal error", trace: error}); 
    }
}

const getAllSchedules = async (req, res) => {
    try {
        console.log(req.body)
        const schedules = await scheduleService.getAll();
        res.status(200).send({status: 'success', payload: schedules});
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "error", error: "Internal error", trace: error}); 
    }
/*     try {
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
    } */
}

export default {
    createSchedule,
    deleteSchedule,
    deleteAllSchedules,
    getAllSchedules,
}