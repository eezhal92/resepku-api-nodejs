import express from 'express';
// import validate from 'express-validation';
// import { create, update } from './validator';
import RecipeController from '../../../controllers/RecipeController';
import RecipeService from '../../../services/RecipeService';

const router = express.Router();

router.route('/')
  .get(RecipeController.index(RecipeService));

router.route('/:id')
  .get(RecipeController.show(RecipeService));

export default router;
