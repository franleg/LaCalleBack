import { Router } from 'express';
import promotionsController from '../controllers/promotions.controller.js';

const router = Router();

// GET ALL PROMOTIONS
router.get('/', promotionsController.getAllPromotions);

// GET PROMOTION BY ID
router.get('/:id', promotionsController.getPromotionById);

// ADD NEW PROMOTION
router.post('/', promotionsController.createPromotion);

// UPDATE PROMOTION BY ID
router.put('/:id', promotionsController.updatePromotionById);

// DELETE ALL PROMOTIONS
router.delete('/', promotionsController.deleteAllPromotions);

// DELETE PROMOTION BY ID
router.delete('/:id', promotionsController.deletePromotionById);

export default router;