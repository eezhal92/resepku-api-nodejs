import express from 'express';
// import validate from 'express-validation';
// import { create, update } from './validator';
import RecipeController from '../../../controllers/RecipeController';
import RecipeService from '../../../services/RecipeService';
import PdfService from '../../../services/PdfService';

const router = express.Router();

router.route('/')
  .get(RecipeController.index(RecipeService));

router.route('/download/:id')
  .get(RecipeController.download(RecipeService, PdfService));

router.route('/:id')
  .get(RecipeController.show(RecipeService));

export default router;
