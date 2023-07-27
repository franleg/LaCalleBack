import { promotionService } from '../services/services.js';

const getAllPromotions = async (req, res) => {
    try {
        const promotions = await promotionService.getAll();
        res.json(promotions);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las promociones' });
    }
}

const getPromotionById = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await promotionService.getById(id);
        res.json(promotion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la promoción' });
    }
}

const createPromotion = async (req, res) => {
    try {
        const promotion = req.body;
        const exists = await promotionService.getById(promotion.id);
        if(exists) {
            const updatedPromotion = await promotionService.updateById(exists._id, promotion);
            return res.status(200).send({ message: 'La promoción ha sido actualizada', payload: updatedPromotion });
        }
        const savedPromotion = await promotionService.save(promotion);
        res.status(200).send({ status: 'success', payload: savedPromotion });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Error al crear la promoción' });
    }
};

const deletePromotionById = async (req, res) => {
    try {
        const { id } = req.params;
        await promotionService.deleteById(id);
        res.json({ message: 'Promoción eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la promoción' });
    }
}

const deleteAllPromotions = async (req, res) => {
    try {
        await promotionService.deleteAll();
        res.json({ message: 'Todas las promociones han sido eliminadas' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar las promociones' });
    }
}

const updatePromotionById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, day, startTime, endTime, field, price } = req.body;
        const updatedPromotion = await promotionService.updateById(id, {
            name,
            day,
            startTime,
            endTime,
            field,
            price,
        });
        res.json(updatedPromotion);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la promoción' });
    }
}

export default {
    getAllPromotions,
    getPromotionById,
    createPromotion,
    deleteAllPromotions,
    deletePromotionById,
    updatePromotionById,
}
